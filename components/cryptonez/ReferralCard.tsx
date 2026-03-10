export function ReferralCard({ code, total }: { code: string; total: number }) {
  return (
    <div className="glass p-5">
      <h3 className="text-lg font-semibold">Referral Program</h3>
      <p className="mt-2 text-sm text-slate-300">Invite friends and earn +10 points per qualified referral.</p>
      <p className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-sm">cryptonez.net/r/{code}</p>
      <p className="mt-3 text-sm text-emerald-300">Total referrals: {total}</p>
    </div>
  );
}
