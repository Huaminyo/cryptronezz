import Link from "next/link";

const sections = [
  "Features",
  "How it works",
  "Tasks preview",
  "Leaderboard preview",
  "Referral program",
  "Community"
];

export default function MarketingPage() {
  console.log("[v0] Marketing page rendering");
  return (
    <main className="space-y-16 pb-12">
      <section className="glass mt-6 p-10 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-indigo-300">Web3 Growth Engine</p>
        <h1 className="text-4xl font-bold md:text-5xl">Cryptonez – The Next Generation Airdrop Platform</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Complete tasks. Earn points. Qualify for future token rewards.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/cryptonez" className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold hover:bg-indigo-400">
            Connect Wallet
          </Link>
          <Link href="/cryptonez/tasks" className="rounded-xl border border-white/20 px-5 py-3 font-semibold hover:bg-white/10">
            Start Earning
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <article key={section} className="glass p-6">
            <h2 className="text-xl font-semibold">{section}</h2>
            <p className="mt-2 text-sm text-slate-300">
              Cryptonez delivers secure automation, anti-bot checks, and production-grade analytics for growth campaigns.
            </p>
          </article>
        ))}
      </section>

      <footer className="glass flex flex-wrap justify-center gap-6 p-6 text-sm text-slate-300">
        {[
          ["Docs", "#"],
          ["Twitter", "#"],
          ["Telegram", "#"],
          ["GitHub", "#"]
        ].map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </footer>
    </main>
  );
}
