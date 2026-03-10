import { desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supportedTaskTypes } from "@/lib/cryptonez/types";
import { db } from "@/lib/db/client";
import { referrals, suspiciousActivity, tasks, users } from "@/lib/db/schema";

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  points: z.number().int().positive(),
  type: z.enum(supportedTaskTypes),
  link: z.string().url()
});

const patchSchema = z.object({
  taskId: z.number().int().positive(),
  isActive: z.boolean()
});

export async function GET() {
  const [allUsers, activity, allTasks, referralStats] = await Promise.all([
    db.select().from(users),
    db.select().from(suspiciousActivity).orderBy(desc(suspiciousActivity.createdAt)).limit(100),
    db.select().from(tasks).orderBy(desc(tasks.createdAt)),
    db
      .select({
        userId: users.id,
        name: users.name,
        referrals: sql<number>`COUNT(${referrals.id})`
      })
      .from(users)
      .leftJoin(referrals, eq(referrals.referrerUserId, users.id))
      .groupBy(users.id)
      .orderBy(desc(sql`COUNT(${referrals.id})`))
      .limit(20)
  ]);

  return NextResponse.json({ users: allUsers, suspiciousActivity: activity, tasks: allTasks, referralStats });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const [task] = await db.insert(tasks).values(parsed.data).returning();
  return NextResponse.json(task);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await db.update(tasks).set({ isActive: parsed.data.isActive }).where(eq(tasks.id, parsed.data.taskId));
  return NextResponse.json({ success: true });
}
