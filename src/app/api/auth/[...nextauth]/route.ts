import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/modules/db";
import { JWT } from "next-auth/jwt";

const nextAuthConst = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { username: credentials.username },
        });
        if (existingUser) {
          return existingUser;
        }
        return null;
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthConst);

export { handler as GET, handler as POST };
