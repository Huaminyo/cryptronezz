import { LeaderboardCard } from "@/components/cryptonez/LeaderboardCard";
import { getLeaderboard } from "@/lib/cryptonez/leaderboard";
import type { LeaderboardResponse } from "@/lib/cryptonez/types";

export default async function LeaderboardPage() {
  let data: LeaderboardResponse = {
    topUsers: [],
    topReferrers: []
  };

  try {
    data = await getLeaderboard();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      {data.topUsers.length === 0 ? (
        <p className="text-slate-400">No leaderboard data available yet.</p>
      ) : (
        <LeaderboardCard data={data} />
      )}
    </main>
  );
}
