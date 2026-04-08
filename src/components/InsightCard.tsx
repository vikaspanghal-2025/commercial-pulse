interface InsightCardProps {
  title: string;
  description: string;
  severity: "critical" | "high" | "opportunity";
  onAsk: () => void;
}

const severityStyles = {
  critical: "bg-bain-red-bg text-bain-red-light border-bain-red/20",
  high: "bg-amber-bg text-amber-400 border-amber-500/20",
  opportunity: "bg-green-bg text-emerald-400 border-emerald-500/20",
};

const severityLabels = {
  critical: "Critical",
  high: "High",
  opportunity: "Opportunity",
};

export default function InsightCard({ title, description, severity, onAsk }: InsightCardProps) {
  return (
    <div className="bg-navy-surface/50 border border-white/10 rounded-lg p-4 flex items-start gap-3">
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 border ${severityStyles[severity]}`}>
        {severityLabels[severity]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-white/50 mt-1 line-clamp-2">{description}</p>
      </div>
      <button
        onClick={onAsk}
        className="text-xs text-bain-red-light hover:text-bain-red shrink-0 cursor-pointer"
      >
        Ask AI →
      </button>
    </div>
  );
}
