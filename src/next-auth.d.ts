import type { DefaultSession } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    oAuthAccessToken: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    oAuthAccessToken: string;
  }
}
