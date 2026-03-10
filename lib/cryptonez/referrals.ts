import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { points, referrals, users } from "@/lib/db/schema";
import { enforceReferralIpLimit, logSuspiciousActivity } from "@/lib/security/antiBot";

export async function claimReferral(referredUserId: number, referralCode: string, ipAddress: string) {
  await enforceReferralIpLimit(ipAddress);

  const [referrer] = await db.select().from(users).where(eq(users.referralCode, referralCode)).limit(1);
  if (!referrer || referrer.id === referredUserId) {
    await logSuspiciousActivity(referredUserId, ipAddress, "referral", "Invalid or self referral");
    throw new Error("Referral invalid");
  }

  await db.insert(referrals).values({ referrerUserId: referrer.id, referredUserId, ipAddress });
  await db.insert(points).values({ userId: referrer.id, amount: 10, source: "referral" });

  return { success: true };
}

export async function getReferralStats(userId: number) {
  const [count] = await db
    .select({ total: sql<number>`COUNT(*)` })
    .from(referrals)
    .where(eq(referrals.referrerUserId, userId));

  return { total: Number(count?.total || 0) };
}

export async function getUserPointsTotal(userId: number) {
  const [summary] = await db
    .select({ total: sql<number>`COALESCE(SUM(${points.amount}), 0)` })
    .from(points)
    .where(eq(points.userId, userId));

  return Number(summary?.total || 0);
}

export async function maxReferralsPerIpToday(ipAddress: string) {
  const start = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [count] = await db
    .select({ total: sql<number>`COUNT(*)` })
    .from(referrals)
    .where(and(eq(referrals.ipAddress, ipAddress), gte(referrals.createdAt, start)));

  return Number(count?.total || 0);
}
