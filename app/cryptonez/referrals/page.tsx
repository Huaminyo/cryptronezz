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
  const data = await fetchJsonSafe<ReferralResponse>(`${baseUrl}/api/referral?userId=1`, {
    referralCode: "USER1",
    referralLink: "cryptonez.net/r/USER1",
    referrals: 0,
    pointsEarned: 0
  });

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Referrals</h1>
      <ReferralCard code={data.referralCode} total={data.referrals} />
      <section className="glass rounded-xl p-5 text-sm text-slate-300">
        <p>Referral link: {data.referralLink}</p>
        <p className="mt-2">Total referrals: {data.referrals}</p>
        <p className="mt-2">Points earned: {data.pointsEarned}</p>
        <p className="mt-2 text-slate-400">No self-referrals. Max 5 referrals per IP per day.</p>
      </section>
    </main>
  );
}
