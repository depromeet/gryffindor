import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Kakao({ clientId: process.env.KAKAO_CLIENT_ID, clientSecret: process.env.KAKAO_CLIENT_SECRET }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.oAuthAccessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.oAuthAccessToken) {
        session.oAuthAccessToken = token.oAuthAccessToken;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
