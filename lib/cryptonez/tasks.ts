import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { points, taskCompletions, tasks } from "@/lib/db/schema";
import { enforceTaskCooldown, logSuspiciousActivity } from "@/lib/security/antiBot";

export async function listActiveTasks() {
  return db.select().from(tasks).where(eq(tasks.isActive, true)).orderBy(desc(tasks.createdAt));
}

export async function claimTask(userId: number, taskId: number, ipAddress: string) {
  await enforceTaskCooldown(userId);

  const [task] = await db.select().from(tasks).where(and(eq(tasks.id, taskId), eq(tasks.isActive, true))).limit(1);
  if (!task) throw new Error("Task not found");

  const today = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [already] = await db
    .select()
    .from(taskCompletions)
    .where(and(eq(taskCompletions.userId, userId), eq(taskCompletions.taskId, taskId), gte(taskCompletions.createdAt, today)))
    .limit(1);

  if (already) {
    await logSuspiciousActivity(userId, ipAddress, "claim_task", "Duplicate task claim attempt");
    throw new Error("Task already claimed today");
  }

  await db.insert(taskCompletions).values({ userId, taskId, ipAddress });
  await db.insert(points).values({ userId, amount: task.points, source: `task:${task.type}` });

  return { success: true, points: task.points };
}

export async function getUserPoints(userId: number) {
  const [summary] = await db.select({ total: sql<number>`COALESCE(SUM(${points.amount}), 0)` }).from(points).where(eq(points.userId, userId));
  return summary?.total || 0;
}
