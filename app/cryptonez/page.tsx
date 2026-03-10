import Link from "next/link";
import { ReferralCard } from "@/components/cryptonez/ReferralCard";
import { StatsCard } from "@/components/cryptonez/StatsCard";
import { WalletConnectCard } from "@/components/cryptonez/WalletConnectCard";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { users, taskCompletions, referrals, points } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function CryptonezDashboard() {
  const session = await auth();
  
  // Get current user or use mock data if not authenticated
  let userStats = {
    totalPoints: 0,
    tasksCompleted: 0,
    referralCount: 0,
    referralCode: "NEZ123"
  };

  if (session?.user?.email) {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, session.user.email));
      
      if (user) {
        // Get total points
        const [pointsResult] = await db
          .select({ total: sql<number>`COALESCE(SUM(${points.amount}), 0)` })
          .from(points)
          .where(eq(points.userId, user.id));

        // Get tasks completed
        const [taskResult] = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(taskCompletions)
          .where(eq(taskCompletions.userId, user.id));

        // Get referral count
        const [referralResult] = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(referrals)
          .where(eq(referrals.referrerUserId, user.id));

        userStats = {
          totalPoints: Number(pointsResult?.total || 0),
          tasksCompleted: Number(taskResult?.count || 0),
          referralCount: Number(referralResult?.count || 0),
          referralCode: user.referralCode
        };
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  }

  return (
    <main className="space-y-6">
      <header className="glass p-6">
        <h1 className="text-3xl font-bold">Cryptonez Dashboard</h1>
        <p className="mt-2 text-slate-300">Track your points, complete tasks, and grow your referral network.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatsCard 
          title="Points" 
          value={userStats.totalPoints.toLocaleString()} 
          helper="Current season total" 
        />
        <StatsCard 
          title="Tasks completed" 
          value={userStats.tasksCompleted.toString()} 
          helper={userStats.tasksCompleted > 0 ? "Keep going!" : "Start your first task"} 
        />
        <StatsCard 
          title="Referral stats" 
          value={userStats.referralCount.toString()} 
          helper={`+${userStats.referralCount * 10} points earned`} 
        />
        <StatsCard 
          title="Leaderboard" 
          value="TBD" 
          helper="Complete tasks to rank" 
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <WalletConnectCard />
        <ReferralCard code={userStats.referralCode} total={userStats.referralCount} />
      </section>

      <nav className="glass flex flex-wrap gap-3 p-4">
        <Link className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition" href="/cryptonez/tasks">Tasks</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition" href="/cryptonez/referrals">Referrals</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition" href="/cryptonez/leaderboard">Leaderboard</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition" href="/cryptonez/admin">Admin</Link>
      </nav>
    </main>
  );
}
