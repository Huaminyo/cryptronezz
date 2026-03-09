import { ReferralCard } from "@/components/cryptonez/ReferralCard";

export default function ReferralsPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Referrals</h1>
      <ReferralCard code="NEZ123" total={8} />
      <p className="text-sm text-slate-400">No self-referrals. Max 5 referrals per IP per day.</p>
    </main>
  );
}
