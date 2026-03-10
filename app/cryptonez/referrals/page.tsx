import { ReferralCard } from "@/components/cryptonez/ReferralCard";
import { fetchJsonSafe, getInternalBaseUrl } from "@/lib/cryptonez/fetcher";

type ReferralResponse = {
  referralCode: string;
  referralLink: string;
  referrals: number;
  pointsEarned: number;
};

export default async function ReferralsPage() {
  const baseUrl = await getInternalBaseUrl();
  const data = await fetchJsonSafe<ReferralResponse | null>(`${baseUrl}/api/referral`, null);

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Referrals</h1>
      <ReferralCard code={data?.referralCode ?? "-"} total={data?.referrals ?? 0} />
      <section className="glass rounded-xl p-5 text-sm text-slate-300">
        <p>Referral link: {data?.referralLink ?? "No referral profile available"}</p>
        <p className="mt-2">Total referrals: {data?.referrals ?? 0}</p>
        <p className="mt-2">Points earned: {data?.pointsEarned ?? 0}</p>
        <p className="mt-2 text-slate-400">No self-referrals. Max 5 referrals per IP per day.</p>
      </section>
    </main>
  );
}
