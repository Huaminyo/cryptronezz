import Link from "next/link";
import { ReferralCard } from "@/components/cryptonez/ReferralCard";
import { StatsCard } from "@/components/cryptonez/StatsCard";
import { WalletConnectCard } from "@/components/cryptonez/WalletConnectCard";
import type { LeaderboardResponse } from "@/lib/cryptonez/types";
import { fetchJsonSafe, getInternalBaseUrl } from "@/lib/cryptonez/fetcher";

type TasksResponse = {
  tasks: Array<{ id: number }>;
};

type ReferralResponse = {
  referrals: number;
  pointsEarned: number;
  totalPoints: number;
  referralCode: string;
};

export default async function CryptonezDashboard() {
  const baseUrl = await getInternalBaseUrl();

  const [tasksData, referralData, leaderboardData] = await Promise.all([
    fetchJsonSafe<TasksResponse>(`${baseUrl}/api/tasks`, { tasks: [] }),
    fetchJsonSafe<ReferralResponse>(`${baseUrl}/api/referral?userId=1`, { referrals: 0, pointsEarned: 0, totalPoints: 0, referralCode: "USER1" }),
    fetchJsonSafe<LeaderboardResponse>(`${baseUrl}/api/leaderboard`, { topUsers: [], topReferrers: [] })
  ]);

  const tasksAvailable = tasksData.tasks.length;
  const referrals = referralData.referrals ?? 0;
  const userPoints = referralData.totalPoints ?? 0;
  const topUsers = leaderboardData.topUsers ?? [];
  const rank = topUsers.findIndex((user) => user.name === "User 1") + 1;

  return (
    <main className="space-y-6">
      <header className="glass rounded-xl p-6">
        <h1 className="text-3xl font-bold">Cryptonez Dashboard</h1>
        <p className="mt-2 text-slate-300">Complete tasks, earn points, and track your standing.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatsCard title="User Points" value={String(userPoints)} helper="Total points from all completed actions" />
        <StatsCard title="Tasks Available" value={String(tasksAvailable)} helper="Active tasks from API" />
        <StatsCard title="Referral Stats" value={String(referrals)} helper={`${referrals * 10} points earned`} />
        <StatsCard title="Leaderboard" value={rank > 0 ? `#${rank}` : "Unranked"} helper="Based on live leaderboard" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <WalletConnectCard />
        <ReferralCard code={referralData.referralCode ?? "USER1"} total={referrals} />
      </section>

      <nav className="glass flex flex-wrap gap-3 rounded-xl p-4">
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/tasks">Tasks</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/referrals">Referrals</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/leaderboard">Leaderboard</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/admin">Admin</Link>
      </nav>
    </main>
  );
}
