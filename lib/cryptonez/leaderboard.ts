import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { points, referrals, users } from "@/lib/db/schema";
import type { LeaderboardResponse } from "./types";

export async function getLeaderboard(): Promise<LeaderboardResponse> {
  const topUsers = await db
    .select({ userId: users.id, name: users.name, points: sql<number>`COALESCE(SUM(${points.amount}), 0)` })
    .from(users)
    .leftJoin(points, eq(points.userId, users.id))
    .groupBy(users.id)
    .orderBy(desc(sql`COALESCE(SUM(${points.amount}), 0)`))
    .limit(10);

  const topReferrers = await db
    .select({ userId: users.id, name: users.name, referrals: sql<number>`COUNT(${referrals.id})` })
    .from(users)
    .leftJoin(referrals, eq(referrals.referrerUserId, users.id))
    .groupBy(users.id)
    .orderBy(desc(sql`COUNT(${referrals.id})`))
    .limit(10);

  return { topUsers, topReferrers };
}
