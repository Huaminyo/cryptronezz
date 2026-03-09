export function StatsCard({ title, value, helper }: { title: string; value: string; helper: string }) {
  return (
    <div className="glass p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </div>
  );
}
