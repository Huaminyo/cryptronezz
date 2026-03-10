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
  userId: number;
  referrals: number;
  pointsEarned: number;
  totalPoints: number;
  referralCode: string;
};

export default async function CryptonezDashboard() {
  const baseUrl = await getInternalBaseUrl();

  const [tasksData, referralData, leaderboardData] = await Promise.all([
    fetchJsonSafe<TasksResponse>(`${baseUrl}/api/tasks`, { tasks: [] }),
    fetchJsonSafe<ReferralResponse | null>(`${baseUrl}/api/referral`, null),
    fetchJsonSafe<LeaderboardResponse>(`${baseUrl}/api/leaderboard`, { topUsers: [], topReferrers: [] })
  ]);

  const tasksAvailable = tasksData.tasks.length;
  const referrals = referralData?.referrals ?? 0;
  const userPoints = referralData?.totalPoints ?? 0;
  const userRank = referralData ? leaderboardData.topUsers.findIndex((user) => user.userId === referralData.userId) + 1 : 0;

  return (
    <main className="space-y-6">
      <header className="glass rounded-xl p-6">
        <h1 className="text-3xl font-bold">Cryptonez Dashboard</h1>
        <p className="mt-2 text-slate-300">Complete tasks, earn points, and track your standing.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatsCard title="User Points" value={String(userPoints)} helper="Total points from completed actions" />
        <StatsCard title="Tasks Available" value={String(tasksAvailable)} helper="Active tasks from database" />
        <StatsCard title="Referral Stats" value={String(referrals)} helper={`${referrals * 10} points from referrals`} />
        <StatsCard title="Leaderboard" value={userRank > 0 ? `#${userRank}` : "Not ranked"} helper="Current leaderboard position" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <WalletConnectCard />
        <ReferralCard code={referralData?.referralCode ?? "-"} total={referrals} />
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
