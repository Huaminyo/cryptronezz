import { LeaderboardCard } from "@/components/cryptonez/LeaderboardCard";

export default function LeaderboardPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <LeaderboardCard
        data={{
          topUsers: [
            { userId: 1, name: "Satoshi", points: 4250 },
            { userId: 2, name: "Vitalik", points: 4021 }
          ],
          topReferrers: [
            { userId: 1, name: "Satoshi", referrals: 44 }
          ]
        }}
      />
    </main>
  );
}
