import { asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { claimReferral, getReferralStats, getUserPointsTotal } from "@/lib/cryptonez/referrals";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const claimSchema = z.object({
  userId: z.number(),
  referralCode: z.string().min(3),
  captchaToken: z.string().min(10)
});

const querySchema = z.object({
  userId: z.coerce.number().int().positive().optional()
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({ userId: request.nextUrl.searchParams.get("userId") ?? undefined });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const [selectedUser] = parsed.data.userId
    ? await db.select().from(users).where(eq(users.id, parsed.data.userId)).limit(1)
    : await db.select().from(users).orderBy(asc(users.createdAt)).limit(1);

  if (!selectedUser) return NextResponse.json({ error: "No users found" }, { status: 404 });

  const [stats, totalPoints] = await Promise.all([getReferralStats(selectedUser.id), getUserPointsTotal(selectedUser.id)]);

  return NextResponse.json({
    userId: selectedUser.id,
    referralCode: selectedUser.referralCode,
    referralLink: `cryptonez.net/r/${selectedUser.referralCode}`,
    referrals: stats.total,
    pointsEarned: stats.total * 10,
    totalPoints
  });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
  const body = await request.json();
  const parsed = claimSchema.safeParse(body);
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
