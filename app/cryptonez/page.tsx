import Link from "next/link";
import { ReferralCard } from "@/components/cryptonez/ReferralCard";
import { StatsCard } from "@/components/cryptonez/StatsCard";
import { WalletConnectCard } from "@/components/cryptonez/WalletConnectCard";

export default function CryptonezDashboard() {
  return (
    <main className="space-y-6">
      <header className="glass p-6">
        <h1 className="text-3xl font-bold">Cryptonez Dashboard</h1>
        <p className="mt-2 text-slate-300">Track your points, complete tasks, and grow your referral network.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatsCard title="Points" value="1,250" helper="Current season total" />
        <StatsCard title="Tasks completed" value="14" helper="2 pending" />
        <StatsCard title="Referral stats" value="8" helper="+80 points earned" />
        <StatsCard title="Leaderboard" value="#23" helper="Top 5%" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <WalletConnectCard />
        <ReferralCard code="NEZ123" total={8} />
      </section>

      <nav className="glass flex flex-wrap gap-3 p-4">
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/tasks">Tasks</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/referrals">Referrals</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/leaderboard">Leaderboard</Link>
        <Link className="rounded-lg bg-white/10 px-4 py-2" href="/cryptonez/admin">Admin</Link>
      </nav>
    </main>
  );
}
