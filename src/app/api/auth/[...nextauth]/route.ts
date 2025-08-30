import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { SessionStrategy } from "next-auth";
import { Session } from "inspector/promises";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Mock Login",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        // ⬇️ Instead of checking a DB, always return a fake user
        return {
          id: "123",
          name: credentials?.username || "Mock User",
          email: "mock@example.com",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };