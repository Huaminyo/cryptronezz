import { AdminPanelClient } from "@/components/cryptonez/AdminPanelClient";
import { fetchJsonSafe, getInternalBaseUrl } from "@/lib/cryptonez/fetcher";

type AdminResponse = {
  users: Array<{ id: number; name: string }>;
  suspiciousActivity: Array<{ id: number; action: string; reason: string }>;
  tasks: Array<{ id: number; title: string; isActive: boolean }>;
  referralStats: Array<{ userId: number; name: string; referrals: number }>;
};

export default async function AdminPage() {
  const baseUrl = await getInternalBaseUrl();
  const data = await fetchJsonSafe<AdminResponse>(`${baseUrl}/api/admin`, { users: [], suspiciousActivity: [], tasks: [], referralStats: [] });

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="glass rounded-xl p-4">
          <h2 className="font-semibold">Task Management</h2>
          <p className="mt-1 text-sm text-slate-300">Create tasks, disable tasks, and manage rewards.</p>
        </section>
        <section className="glass rounded-xl p-4">
          <h2 className="font-semibold">Risk Monitor</h2>
          <p className="mt-1 text-sm text-slate-300">Review suspicious activity, users, and referral stats.</p>
        </section>
      </div>
      <AdminPanelClient initialData={data} />
    </main>
  );
}
