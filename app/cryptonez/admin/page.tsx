import { AdminPanelClient } from "@/components/cryptonez/AdminPanelClient";
import { fetchJsonSafe, getInternalBaseUrl } from "@/lib/cryptonez/fetcher";

type AdminResponse = {
  users: Array<{ id: number; name: string }>;
  suspiciousActivity: Array<{ id: number; action: string; reason: string }>;
  tasks: Array<{ id: number; title: string; isActive: boolean }>;
};

export default async function AdminPage() {
  const baseUrl = await getInternalBaseUrl();
  const data = await fetchJsonSafe<AdminResponse>(`${baseUrl}/api/admin`, { users: [], suspiciousActivity: [], tasks: [] });

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <AdminPanelClient initialData={data} />
    </main>
  );
}
