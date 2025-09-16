import type { DefaultSession } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
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
    error?: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
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
    error?: string;
  }
}
