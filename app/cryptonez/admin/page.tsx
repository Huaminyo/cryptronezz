export default function AdminPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="glass rounded-xl p-5">
          <h2 className="font-semibold">Create / Disable Tasks</h2>
          <p className="mt-2 text-sm text-slate-300">Manage campaign tasks, rewards, and active state.</p>
        </section>
        <section className="glass rounded-xl p-5">
          <h2 className="font-semibold">Users</h2>
          <p className="mt-2 text-sm text-slate-300">View registered users and wallet connection status.</p>
        </section>
        <section className="glass rounded-xl p-5">
          <h2 className="font-semibold">Suspicious Activity</h2>
          <p className="mt-2 text-sm text-slate-300">Inspect anti-bot alerts, abuse attempts, and enforcement outcomes.</p>
        </section>
        <section className="glass rounded-xl p-5">
          <h2 className="font-semibold">Referral Stats</h2>
          <p className="mt-2 text-sm text-slate-300">Track referral volume, conversion quality, and reward issuance.</p>
        </section>
      </div>
    </main>
  );
}
