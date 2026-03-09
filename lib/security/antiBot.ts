import { and, desc, eq, gte } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { referrals, suspiciousActivity, taskCompletions } from "@/lib/db/schema";

export async function enforceTaskCooldown(userId: number) {
  const tenSecondsAgo = new Date(Date.now() - 10_000);
  const [latest] = await db
    .select()
    .from(taskCompletions)
    .where(and(eq(taskCompletions.userId, userId), gte(taskCompletions.createdAt, tenSecondsAgo)))
    .orderBy(desc(taskCompletions.createdAt))
    .limit(1);

  if (latest) throw new Error("Task cooldown active");
}

export async function enforceReferralIpLimit(ipAddress: string) {
  const oneDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const rows = await db
    .select()
    .from(referrals)
    .where(and(eq(referrals.ipAddress, ipAddress), gte(referrals.createdAt, oneDay)));

  if (rows.length >= 5) throw new Error("Max referrals per IP reached");
}

export async function logSuspiciousActivity(userId: number | null, ipAddress: string, action: string, reason: string) {
  await db.insert(suspiciousActivity).values({ userId, ipAddress, action, reason });
}
