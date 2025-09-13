import type { DefaultSession } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    oAuthAccessToken: string;
    oAuthRefreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    userId: string;
    nickname: string;
    level: number;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    oAuthAccessToken: string;
    oAuthRefreshToken: string;
    accessTokenExpiresAt: number;
    userId: string;
    nickname: string;
    level: number;
    error?: string;
  }
}
