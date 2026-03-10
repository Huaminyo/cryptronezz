import Link from "next/link";
import { ReferralCard } from "@/components/cryptonez/ReferralCard";
import { StatsCard } from "@/components/cryptonez/StatsCard";
import { WalletConnectCard } from "@/components/cryptonez/WalletConnectCard";

export default function CryptonezDashboard() {
  return (
    <main className="space-y-6">
      <header className="glass rounded-xl p-6">
        <h1 className="text-3xl font-bold">Cryptonez Dashboard</h1>
        <p className="mt-2 text-slate-300">No profile data yet. Connect your wallet and start completing tasks.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatsCard title="User Points" value="0" helper="Placeholder until first claim" />
        <StatsCard title="Tasks Available" value="5" helper="Follow, join, visit, daily, wallet" />
        <StatsCard title="Referral Stats" value="0" helper="0 invites · 0 points earned" />
        <StatsCard title="Leaderboard" value="Unranked" helper="Complete tasks to appear" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <WalletConnectCard />
        <ReferralCard code="YOURCODE" total={0} />
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
