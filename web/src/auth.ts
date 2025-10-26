import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { isTokenExpired } from "@/shared/lib";
import type { ApiResponse } from "@/shared/model";

export interface LoginResponse {
  memberId: number;
  nickName: string;
  level: number;
  profileImage: string;
  providerType: "KAKAO" | "GOOGLE";
  email: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
  memberRole: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Apple,
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn() {
      // 로그인 성공 시 항상 true 반환하여 로그인 허용
      return true;
    },
    async redirect({ url, baseUrl }) {
      // 로그인 후 리다이렉트 로직
      // 콜백 URL에서 온 경우가 아닌 일반적인 경우에만 처리
      if (url.startsWith(baseUrl) || url.startsWith("/")) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, account, trigger, session }) {
      // 최초 로그인 시 소셜 로그인 처리
      console.log("===jwt 처리====", token, account, trigger, session);

      if (account?.access_token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/oauth/social-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                provider: account.provider.toUpperCase(),
                oAuthToken: account.access_token,
              }),
            },
          );
          const data = (await response.json()) as ApiResponse<LoginResponse>;
          console.log("로그인 성공 RESPONSE", data.response);

          if (data.response) {
            token.accessToken = data.response.accessToken;
            token.refreshToken = data.response.refreshToken;
            token.accessTokenExpiration = data.response.accessTokenExpiration;
            token.refreshTokenExpiration = data.response.refreshTokenExpiration;
            token.memberId = data.response.memberId;
            token.nickName = data.response.nickName;
            token.level = data.response.level;
          }
        } catch (error) {
          console.error("Social login error:", error);
          return { ...token, error: "SocialLoginError" };
        }
      }

      // 토큰 만료 확인 및 갱신
      if (token.accessTokenExpiration && isTokenExpired(token.accessTokenExpiration)) {
        // 1. refreshToken 존재 확인
        if (!token.refreshToken) {
          console.error("No refresh token available - signing out");
          return null; // 세션 종료
        }

        // 2. refreshToken 만료 확인 (갱신 전에 체크)
        if (token.refreshTokenExpiration && isTokenExpired(token.refreshTokenExpiration)) {
          console.error("Refresh token expired - signing out");
          return null; // 세션 종료
        }

        // 3. 토큰 갱신 중복 방지
        if (token.isRefreshing) {
          console.log("Token refresh already in progress");
          return token;
        }

        token.isRefreshing = true;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/renew`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.refreshToken}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = (await response.json()) as ApiResponse<LoginResponse>;
          console.log("리프래쉬 토큰 로테이션 성공 RESPONSE", data.response);
          if (data.response) {
            return {
              ...token,
              accessToken: data.response.accessToken,
              refreshToken: data.response.refreshToken,
              accessTokenExpiration: data.response.accessTokenExpiration,
              refreshTokenExpiration: data.response.refreshTokenExpiration,
              memberId: data.response.memberId,
              nickName: data.response.nickName,
              level: data.response.level,
              isRefreshing: false,
              error: undefined,
            };
          } else {
            console.error("Failed to refresh token - signing out");
            return null; // 세션 종료
          }
        } catch (error) {
          console.error("Token refresh error - signing out:", error);
          return null; // 세션 종료
        }
      }

      // 세션 업데이트 처리
      if (trigger === "update" && session) {
        console.log("===세션 업데이트 처리====(session)", session);

        if (session.nickName) {
          token.nickName = session.nickName;
        }
        if (session.level) {
          token.level = session.level;
        }
      }

      // [GET] user/me호출 response 중 level과 nickname을 토큰에 저장
      try {
        const userMeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          },
        );

        const userMeData = await userMeResponse.json();

        console.log("===get userMeData====", userMeData);

        token.level = userMeData.response.level;
        token.nickName = userMeData.response.nickname;
      } catch (error) {
        console.error("User me error:", error);
        signOut({ redirectTo: "/home" });
      }

      return token;
    },
    async session({ session, token }) {
      console.log("===session====", session, token);
      // 토큰 정보를 세션에 전달
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiration = token.accessTokenExpiration;
        session.refreshTokenExpiration = token.refreshTokenExpiration;
        session.memberId = token.memberId;
        session.nickName = token.nickName;
        session.level = token.level;
      }

      // 에러 정보도 세션에 전달
      if (token.error) {
        session.error = token.error as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
