import type { LeaderboardResponse } from "@/lib/cryptonez/types";

export function LeaderboardCard({ data }: { data: LeaderboardResponse }) {
  return (
    <div className="glass p-5">
      <h3 className="text-lg font-semibold">Leaderboard</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {data.topUsers.map((entry, idx) => (
          <li key={entry.userId} className="flex justify-between">
            <span>#{idx + 1} {entry.name}</span>
            <span>{entry.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
