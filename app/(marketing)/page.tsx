import Link from "next/link";

const features = [
  "Multi-chain airdrop task orchestration",
  "Referral intelligence with anti-abuse controls",
  "Live points and leaderboard analytics"
];

const howItWorks = [
  "Create your profile and connect wallet",
  "Complete social and ecosystem tasks",
  "Earn points and climb weekly rankings"
];

export default function MarketingPage() {
  return (
    <main className="space-y-10 pb-10">
      <section className="glass mt-6 rounded-xl p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-indigo-300">Web3 Airdrop Infrastructure</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Cryptonez</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-300">Next Generation Web3 Airdrop Platform</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/cryptonez/tasks" className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold hover:bg-indigo-400">
            Start Earning
          </Link>
          <Link href="/cryptonez" className="rounded-xl border border-white/20 px-5 py-3 font-semibold hover:bg-white/10">
            Connect Wallet
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((item) => (
          <article key={item} className="glass rounded-xl p-5">
            <h2 className="text-lg font-semibold">Features</h2>
            <p className="mt-2 text-sm text-slate-300">{item}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {howItWorks.map((step, idx) => (
          <article key={step} className="glass rounded-xl p-5">
            <h2 className="text-lg font-semibold">How It Works</h2>
            <p className="mt-2 text-sm text-slate-300">{idx + 1}. {step}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Tasks", "Follow, join, visit, and daily streak missions to earn consistent points."],
          ["Leaderboard", "Track top users and top referrers in real time."],
          ["Referral System", "Share your invite link and earn bonus points per qualified user."]
        ].map(([title, text]) => (
          <article key={title} className="glass rounded-xl p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{text}</p>
          </article>
        ))}
      </section>

      <footer className="glass rounded-xl p-6 text-sm text-slate-300">© {new Date().getFullYear()} Cryptonez • Community-driven growth platform.</footer>
    </main>
  );
}
