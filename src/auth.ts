import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { isTokenExpired, refreshAccessToken } from "@/shared/lib";
import type { ApiResponse } from "@/shared/model";

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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/social-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                provider: account.provider,
                oAuthToken: account.access_token,
              }),
            },
          );

          const data = (await response.json()) as ApiResponse<{
            userId: string;
            nickname: string;
            level: number;
            accessToken: string;
            refreshToken: string;
            accessTokenExpiresIn: number;
            refreshTokenExpiresIn: number;
          }>;

          if (data.response) {
            const now = Math.floor(Date.now() / 1000);

            token.oAuthAccessToken = data.response.accessToken;
            token.oAuthRefreshToken = data.response.refreshToken;
            token.accessTokenExpiresAt = now + data.response.accessTokenExpiresIn;
            token.refreshTokenExpiresAt = now + data.response.refreshTokenExpiresIn;
            token.userId = data.response.userId;
            token.nickname = data.response.nickname;
            token.level = data.response.level;
          }
        } catch (error) {
          console.error("Social login error:", error);
          return { ...token, error: "SocialLoginError" };
        }
      }

      // 토큰 만료 확인 및 갱신
      if (token.accessTokenExpiresAt && isTokenExpired(token.accessTokenExpiresAt)) {
        if (!token.oAuthRefreshToken) {
          console.error("No refresh token available");
          return { ...token, error: "RefreshTokenMissing" };
        }

        // Refresh token도 만료되었는지 확인
        if (token.refreshTokenExpiresAt && isTokenExpired(token.refreshTokenExpiresAt)) {
          console.error("Refresh token expired");
          return { ...token, error: "RefreshTokenExpired" };
        }

        try {
          const refreshedTokens = await refreshAccessToken(token.oAuthRefreshToken);

          if (refreshedTokens) {
            token.oAuthAccessToken = refreshedTokens.accessToken;
            token.oAuthRefreshToken = refreshedTokens.refreshToken;
            token.accessTokenExpiresAt = refreshedTokens.accessTokenExpiresAt;
            token.refreshTokenExpiresAt = refreshedTokens.refreshTokenExpiresAt;
            token.userId = refreshedTokens.userId;
            token.nickname = refreshedTokens.nickname;
            token.level = refreshedTokens.level;

            // 성공적으로 갱신된 경우 error 제거
            if (token.error) {
              delete token.error;
            }
          } else {
            console.error("Failed to refresh token");
            return { ...token, error: "RefreshTokenFailed" };
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          return { ...token, error: "RefreshTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      // 토큰 정보를 세션에 전달
      if (token.oAuthAccessToken) {
        session.oAuthAccessToken = token.oAuthAccessToken;
        session.oAuthRefreshToken = token.oAuthRefreshToken;
        session.accessTokenExpiresAt = token.accessTokenExpiresAt;
        session.userId = token.userId;
        session.nickname = token.nickname;
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
