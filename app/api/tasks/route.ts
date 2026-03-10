import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { claimTask, listActiveTasks } from "@/lib/cryptonez/tasks";
import { rateLimitByIp } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const claimSchema = z.object({
  userId: z.number(),
  taskId: z.number(),
  captchaToken: z.string().min(10)
});

export async function GET() {
  const tasks = await listActiveTasks();
  return NextResponse.json({ tasks });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
  if (!rateLimitByIp(ip, 50, 60_000)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const body = await request.json();
  const parsed = claimSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const captchaPass = await verifyTurnstileToken(parsed.data.captchaToken, ip);
  if (!captchaPass) return NextResponse.json({ error: "Captcha validation failed" }, { status: 400 });

  try {
    const result = await claimTask(parsed.data.userId, parsed.data.taskId, ip);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
