export default function AdminPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="glass p-5">
          <h2 className="font-semibold">Task Management</h2>
          <p className="mt-2 text-sm text-slate-300">Create tasks, disable tasks, and manage rewards.</p>
        </section>
        <section className="glass p-5">
          <h2 className="font-semibold">Risk Monitor</h2>
          <p className="mt-2 text-sm text-slate-300">Review suspicious activity, users, and referral stats.</p>
        </section>
      </div>
    </main>
  );
}
