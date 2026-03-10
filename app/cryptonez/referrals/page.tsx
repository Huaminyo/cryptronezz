import { ReferralCard } from "@/components/cryptonez/ReferralCard";

export default function ReferralsPage() {
  const totalReferrals = 0;

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Referrals</h1>
      <ReferralCard code="YOURCODE" total={totalReferrals} />
      <section className="glass rounded-xl p-5 text-sm text-slate-300">
        <p>Referral link: cryptonez.net/r/YOURCODE</p>
        <p className="mt-2">Total referrals: {totalReferrals}</p>
        <p className="mt-2">Points earned: {totalReferrals * 10}</p>
        <p className="mt-2 text-slate-400">No self-referrals. Max 5 referrals per IP per day.</p>
      </section>
    </main>
  );
}
