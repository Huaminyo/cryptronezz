import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="space-y-20 pb-20">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass flex items-center justify-between px-6 py-4 md:px-8">
        <h1 className="text-2xl font-bold">Cryptonez</h1>
        <nav className="hidden md:flex gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
          <a href="#rewards" className="hover:text-white transition">Rewards</a>
        </nav>
        <Link href="/cryptonez" className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold hover:bg-indigo-500 transition">
          Launch App
        </Link>
      </header>

      {/* Hero Section */}
      <section className="space-y-8 text-center pt-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-emerald-400 font-semibold">Web3 Growth Platform</p>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Earn Rewards<br />
            <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Through Tasks
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 leading-relaxed">
            Complete tasks, earn points, and qualify for exclusive token rewards. Join thousands of Web3 enthusiasts building the future of decentralized platforms.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link 
            href="/cryptonez" 
            className="rounded-full bg-indigo-600 px-8 py-3 font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/50"
          >
            Start Earning Now
          </Link>
          <Link 
            href="/cryptonez/tasks" 
            className="rounded-full border border-white/20 px-8 py-3 font-semibold hover:bg-white/5 transition"
          >
            View Tasks
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass grid md:grid-cols-3 gap-6 p-8">
        <div className="space-y-2">
          <p className="text-3xl font-bold text-emerald-400">10K+</p>
          <p className="text-slate-300">Active Users</p>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-indigo-400">500K+</p>
          <p className="text-slate-300">Points Distributed</p>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-cyan-400">100+</p>
          <p className="text-slate-300">Available Tasks</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="space-y-8">
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold">Platform Features</h3>
          <p className="text-slate-400">Everything you need to grow your rewards</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Tasks", desc: "Complete daily tasks to earn points and climb the leaderboard" },
            { title: "Leaderboard", desc: "Compete with other users and earn exclusive rewards" },
            { title: "Referrals", desc: "Share your referral code and earn bonuses from friends" },
            { title: "Anti-Bot", desc: "Secure platform with advanced bot detection" },
            { title: "Real-Time", desc: "Instant point updates and reward tracking" },
            { title: "Community", desc: "Join a thriving Web3 community" }
          ].map((feature) => (
            <article key={feature.title} className="glass p-6 space-y-3 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="glass p-8 space-y-6">
        <h3 className="text-3xl font-bold text-center">How It Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Sign Up", desc: "Create your account in seconds" },
            { step: "2", title: "Complete Tasks", desc: "Choose from available tasks" },
            { step: "3", title: "Earn Points", desc: "Get instant point rewards" },
            { step: "4", title: "Claim Rewards", desc: "Qualify for token airdrop" }
          ].map((item) => (
            <div key={item.step} className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-indigo-400">
                {item.step}
              </div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="space-y-8">
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold">Rewards Program</h3>
          <p className="text-slate-400">Earn points and qualify for exclusive benefits</p>
        </div>
        <div className="glass p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-emerald-400 font-semibold">Tasks Rewards</p>
              <p className="text-2xl font-bold">5-50 points per task</p>
              <p className="text-slate-400">Daily tasks with varying difficulty levels</p>
            </div>
            <div className="space-y-2">
              <p className="text-indigo-400 font-semibold">Referral Bonus</p>
              <p className="text-2xl font-bold">+10 points per referral</p>
              <p className="text-slate-400">Unlimited earning potential</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass p-8 md:p-12 text-center space-y-6">
        <h3 className="text-3xl md:text-4xl font-bold">Ready to Start?</h3>
        <p className="text-slate-300 max-w-xl mx-auto">
          Join thousands of users earning rewards today. Sign up now and start completing tasks.
        </p>
        <Link 
          href="/cryptonez" 
          className="inline-block rounded-full bg-indigo-600 px-8 py-3 font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/50"
        >
          Launch App
        </Link>
      </section>

      {/* Footer */}
      <footer className="flex flex-wrap justify-center gap-6 py-8 text-sm text-slate-400 border-t border-white/10">
        <a href="#" className="hover:text-white transition">Docs</a>
        <a href="#" className="hover:text-white transition">Twitter</a>
        <a href="#" className="hover:text-white transition">Telegram</a>
        <a href="#" className="hover:text-white transition">GitHub</a>
        <p>© 2026 Cryptonez. All rights reserved.</p>
      </footer>
    </main>
  );
}
