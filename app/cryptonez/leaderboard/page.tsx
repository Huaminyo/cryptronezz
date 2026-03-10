import { LeaderboardCard } from "@/components/cryptonez/LeaderboardCard";
import type { LeaderboardResponse } from "@/lib/cryptonez/types";
import { fetchJsonSafe, getInternalBaseUrl } from "@/lib/cryptonez/fetcher";

export default async function LeaderboardPage() {
  const baseUrl = await getInternalBaseUrl();
  const data = await fetchJsonSafe<LeaderboardResponse>(`${baseUrl}/api/leaderboard`, { topUsers: [], topReferrers: [] });

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <LeaderboardCard data={data} />
      <section className="glass rounded-xl p-5">
        <h2 className="text-lg font-semibold">Top Users</h2>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="py-2">Rank</th>
              <th className="py-2">Wallet/User</th>
              <th className="py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.topUsers.map((entry, idx) => (
              <tr key={entry.userId} className="border-t border-white/10">
                <td className="py-2">#{idx + 1}</td>
                <td className="py-2">{entry.name}</td>
                <td className="py-2">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
