import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { claimReferral } from "@/lib/cryptonez/referrals";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const schema = z.object({
  userId: z.number(),
  referralCode: z.string().min(3),
  captchaToken: z.string().min(10)
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const captchaPass = await verifyTurnstileToken(parsed.data.captchaToken, ip);
  if (!captchaPass) return NextResponse.json({ error: "Captcha validation failed" }, { status: 400 });

  try {
    const result = await claimReferral(parsed.data.userId, parsed.data.referralCode, ip);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
