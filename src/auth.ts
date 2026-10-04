import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const password = credentials?.password;

        if (
          typeof password !== "string" ||
          !process.env.AUTH_PASSWORD ||
          password !== process.env.AUTH_PASSWORD
        ) {
          return null;
        }

        return {
          id: "admin",
          name: "Oliver",
          role: "admin",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
