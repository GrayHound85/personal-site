import { createHash, timingSafeEqual } from "node:crypto";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../auth.config";
import {
  clearLoginFailures,
  getClientIp,
  getLockoutRemaining,
  recordLoginFailure,
} from "@l/auth/login-limiter";

export class LoginRateLimited extends CredentialsSignin {
  code = "rate_limited";
}

function passwordMatches(password: string, expected: string): boolean {
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(password), hash(expected));
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },

      // Runs for both the login form and direct POSTs to
      // /api/auth/callback/credentials, so the lockout covers both.
      async authorize(credentials, request) {
        const ip = getClientIp(request.headers);

        if (getLockoutRemaining(ip) > 0) {
          throw new LoginRateLimited();
        }

        const password = credentials?.password;

        if (
          typeof password !== "string" ||
          !process.env.AUTH_PASSWORD ||
          !passwordMatches(password, process.env.AUTH_PASSWORD)
        ) {
          recordLoginFailure(ip);
          return null;
        }

        clearLoginFailures(ip);

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
