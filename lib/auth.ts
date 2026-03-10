import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Guest",
      credentials: {
        name: { label: "Name", type: "text" },
        walletAddress: { label: "Wallet", type: "text" },
        captchaToken: { label: "Captcha", type: "text" }
      },
      async authorize(credentials, request) {
        const schema = z.object({
          name: z.string().min(2),
          walletAddress: z.string().optional(),
          captchaToken: z.string().min(10)
        });

        const parsed = schema.safeParse(credentials);
        if (!parsed.success) return null;

        const ip = request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim();
        const captchaPass = await verifyTurnstileToken(parsed.data.captchaToken, ip);
        if (!captchaPass) return null;

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
  }
});
