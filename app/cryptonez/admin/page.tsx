import { db } from "@/lib/db/client";
import { tasks, suspiciousActivity, users } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export default async function AdminPage() {
  let adminStats = {
    totalTasks: 0,
    activeTasks: 0,
    suspiciousActivities: 0,
    totalUsers: 0
  };

  try {
    const [taskCount] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(tasks);
    
    const [activeCount] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(tasks)
      .where(sql`is_active = true`);
    
    const [activityCount] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(suspiciousActivity);
    
    const [userCount] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users);

    adminStats = {
      totalTasks: Number(taskCount?.count || 0),
      activeTasks: Number(activeCount?.count || 0),
      suspiciousActivities: Number(activityCount?.count || 0),
      totalUsers: Number(userCount?.count || 0)
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="glass p-5">
          <h2 className="font-semibold">Task Management</h2>
          <p className="mt-2 text-sm text-slate-300">
            Total Tasks: {adminStats.totalTasks} ({adminStats.activeTasks} active)
          </p>
          <p className="text-sm text-slate-400 mt-1">Create tasks, disable tasks, and manage rewards.</p>
        </section>
        <section className="glass p-5">
          <h2 className="font-semibold">Risk Monitor</h2>
          <p className="mt-2 text-sm text-slate-300">
            Suspicious Activities: {adminStats.suspiciousActivities}
          </p>
          <p className="text-sm text-slate-400 mt-1">Review suspicious activity, users, and referral stats.</p>
        </section>
        <section className="glass p-5">
          <h2 className="font-semibold">Platform Overview</h2>
          <p className="mt-2 text-sm text-slate-300">
            Total Users: {adminStats.totalUsers}
          </p>
          <p className="text-sm text-slate-400 mt-1">Monitor platform growth and user activity.</p>
        </section>
      </div>
    </main>
  );
}
