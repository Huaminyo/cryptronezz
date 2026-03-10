import { LeaderboardCard } from "@/components/cryptonez/LeaderboardCard";

const topUsers = [
  { userId: 1, name: "0xA1...94f", points: 4250 },
  { userId: 2, name: "0xB4...1ce", points: 4021 },
  { userId: 3, name: "0xC7...8ad", points: 3975 }
];

export default function LeaderboardPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <LeaderboardCard data={{ topUsers, topReferrers: [] }} />
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
            {topUsers.map((entry, idx) => (
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
