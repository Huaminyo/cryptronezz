import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { suspiciousActivity, tasks, users } from "@/lib/db/schema";
import { supportedTaskTypes } from "@/lib/cryptonez/types";

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  points: z.number().int().positive(),
  type: z.enum(supportedTaskTypes),
  link: z.string().url()
});

export async function GET() {
  const [allUsers, activity, allTasks] = await Promise.all([
    db.select().from(users),
    db.select().from(suspiciousActivity),
    db.select().from(tasks)
  ]);

  return NextResponse.json({ users: allUsers, suspiciousActivity: activity, tasks: allTasks });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const [task] = await db.insert(tasks).values(parsed.data).returning();
  return NextResponse.json(task);
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as { taskId: number; isActive: boolean };
  await db.update(tasks).set({ isActive: body.isActive }).where(eq(tasks.id, body.taskId));
  return NextResponse.json({ success: true });
}
