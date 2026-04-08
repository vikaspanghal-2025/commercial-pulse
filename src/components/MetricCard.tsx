interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  status?: "on-track" | "at-risk" | "critical";
}

const statusColors = {
  "on-track": "bg-green-bg text-emerald-400",
  "at-risk": "bg-amber-bg text-amber-400",
  critical: "bg-bain-red-bg text-bain-red-light",
};

const statusLabels = {
  "on-track": "On track",
  "at-risk": "At risk",
  critical: "Critical",
};

export default function MetricCard({ label, value, delta, status }: MetricCardProps) {
  return (
    <div className="bg-navy-surface/80 border border-white/10 rounded-xl p-5">
      <p className="text-sm text-white/50 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      <div className="flex items-center gap-2 mt-2">
        {delta && <span className="text-xs text-white/40">{delta}</span>}
        {status && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        )}
      </div>
    </div>
  );
}
