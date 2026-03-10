import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Credentials({
      name: "Guest",
      credentials: {
        name: { label: "Name", type: "text" },
        walletAddress: { label: "Wallet", type: "text" },
        captchaToken: { label: "Captcha", type: "text" }
      },
      async authorize(credentials) {
        const schema = z.object({
          name: z.string().min(2),
          walletAddress: z.string().optional(),
          captchaToken: z.string().min(10)
        });

        const parsed = schema.safeParse(credentials);
        if (!parsed.success) return null;

        return {
          id: crypto.randomUUID(),
          name: parsed.data.name,
          walletAddress: parsed.data.walletAddress,
          emailVerified: null
        };
      }
    })
  ],
  pages: {
    signIn: "/cryptonez"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.walletAddress = user.walletAddress;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.walletAddress = token.walletAddress as string;
      }
      return session;
    }
  }
});
