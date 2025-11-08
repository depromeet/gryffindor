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
      console.log("🔐 [JWT 콜백] 호출됨", {
        hasTrigger: !!trigger,
        trigger,
        hasAccount: !!account,
        provider: account?.provider,
        hasAccessToken: !!token.accessToken,
        currentLevel: token.level,
        currentNickName: token.nickName,
      });

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
          console.log("✅ [JWT 콜백] 소셜 로그인 성공", {
            memberId: data.response?.memberId,
            nickName: data.response?.nickName,
            level: data.response?.level,
            hasAccessToken: !!data.response?.accessToken,
          });

          if (data.response) {
            token.accessToken = data.response.accessToken;
            token.refreshToken = data.response.refreshToken;
            token.accessTokenExpiration = data.response.accessTokenExpiration;
            token.refreshTokenExpiration = data.response.refreshTokenExpiration;
            token.memberId = data.response.memberId;
            token.nickName = data.response.nickName;
            token.level = data.response.level;
            console.log("✅ [JWT 콜백] 토큰에 저장 완료", {
              memberId: token.memberId,
              nickName: token.nickName,
              level: token.level,
            });

            // 최초 로그인 시 user/me 호출하여 최신 정보 가져오기
            console.log("📞 [JWT 콜백] 최초 로그인 - user/me 호출 시작...");
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
              console.log("✅ [JWT 콜백] 최초 로그인 user/me 응답", {
                level: userMeData.response?.level,
                nickname: userMeData.response?.nickname,
              });

              token.level = userMeData.response.level;
              token.nickName = userMeData.response.nickname;
            } catch (error) {
              console.error("❌ [JWT 콜백] 최초 로그인 user/me 에러:", error);
            }
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

      // 세션 업데이트 처리 (온보딩 완료 등 명시적 업데이트)
      if (trigger === "update" && session) {
        console.log("🔄 [JWT 콜백] 세션 업데이트 트리거", {
          sessionNickName: session.nickName,
          sessionLevel: session.level,
        });

        if (session.nickName) {
          token.nickName = session.nickName;
        }
        if (session.level) {
          token.level = session.level;
        }

        // update trigger 시에는 user/me 호출하여 최신 정보 반영
        console.log("📞 [JWT 콜백] 업데이트 트리거 - user/me 호출 시작...");
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
          console.log("✅ [JWT 콜백] 업데이트 트리거 user/me 응답", {
            level: userMeData.response?.level,
            nickname: userMeData.response?.nickname,
          });

          token.level = userMeData.response.level;
          token.nickName = userMeData.response.nickname;
        } catch (error) {
          console.error("❌ [JWT 콜백] 업데이트 트리거 user/me 에러:", error);
        }
      }

      // 조건부 user/me 호출 (fallback: token에 level/nickName이 없는 경우)
      if (!token.level || !token.nickName) {
        console.log("⚠️ [JWT 콜백] 토큰에 level/nickName 없음 - user/me 호출 (fallback)");
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
          console.log("✅ [JWT 콜백] fallback user/me 응답", {
            level: userMeData.response?.level,
            nickname: userMeData.response?.nickname,
          });

          token.level = userMeData.response.level;
          token.nickName = userMeData.response.nickname;
        } catch (error) {
          console.error("❌ [JWT 콜백] fallback user/me 에러:", error);
          signOut({ redirectTo: "/home" });
        }
      } else {
        console.log("✅ [JWT 콜백] 토큰에 level/nickName 존재 - user/me 호출 스킵", {
          level: token.level,
          nickName: token.nickName,
        });
      }

      console.log("🔐 [JWT 콜백] 최종 토큰 반환", {
        memberId: token.memberId,
        nickName: token.nickName,
        level: token.level,
        hasAccessToken: !!token.accessToken,
      });
      return token;
    },
    async session({ session, token }) {
      console.log("🎫 [Session 콜백] 호출됨", {
        hasToken: !!token,
        tokenData: {
          memberId: token.memberId,
          nickName: token.nickName,
          level: token.level,
          hasAccessToken: !!token.accessToken,
        },
      });

      // 토큰 정보를 세션에 전달
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiration = token.accessTokenExpiration;
        session.refreshTokenExpiration = token.refreshTokenExpiration;
        session.memberId = token.memberId;
        session.nickName = token.nickName;
        session.level = token.level;

        console.log("✅ [Session 콜백] 세션에 토큰 정보 저장 완료", {
          memberId: session.memberId,
          nickName: session.nickName,
          level: session.level,
        });
      }

      // 에러 정보도 세션에 전달
      if (token.error) {
        session.error = token.error as string;
        console.log("⚠️ [Session 콜백] 에러 정보 포함", { error: session.error });
      }

      console.log("🎫 [Session 콜백] 최종 세션 반환", {
        hasAccessToken: !!session.accessToken,
        memberId: session.memberId,
        nickName: session.nickName,
        level: session.level,
      });

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
