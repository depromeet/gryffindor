import NextAuth from "next-auth";
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
    Kakao({ clientId: process.env.KAKAO_CLIENT_ID, clientSecret: process.env.KAKAO_CLIENT_SECRET }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 최초 로그인 시 소셜 로그인 처리

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
          console.error("No refresh token available");
          return { ...token, error: "RefreshTokenMissing" };
        }
        console.log("refreshToken", token);
        // 3. 토큰 갱신 시도
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

          const data = (await response.json()) as ApiResponse<LoginResponse>;

          if (data.response) {
            token.accessToken = data.response.accessToken;
            token.refreshToken = data.response.refreshToken;
            token.accessTokenExpiration = data.response.accessTokenExpiration;
            token.refreshTokenExpiration = data.response.refreshTokenExpiration;
            token.memberId = data.response.memberId;
            token.nickName = data.response.nickName;
            token.level = data.response.level;

            // 성공적으로 갱신된 경우 error 제거
            if (token.error) {
              delete token.error;
            }
          } else {
            console.error("Failed to refresh token:", data);
            return { ...token, error: "RefreshTokenFailed" };
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          return { ...token, error: "RefreshTokenError" };
        }

        // 2. refreshToken 만료 확인
        if (token.refreshTokenExpiration && isTokenExpired(token.refreshTokenExpiration)) {
          console.error("Refresh token expired");
          return { ...token, error: "RefreshTokenExpired" };
        }
      }

      return token;
    },
    async session({ session, token }) {
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
