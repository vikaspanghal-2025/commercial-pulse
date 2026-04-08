import MetricCard from "../components/MetricCard";
import AIRecommendation from "../components/AIRecommendation";
import TopBar from "../components/TopBar";
import { data } from "../data";

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const fmt = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`;

const getStatusPill = (leakage: number) => {
  if (leakage > 0.1) return { label: "Critical", cls: "bg-bain-red-bg text-bain-red-light" };
  if (leakage > 0.05) return { label: "High", cls: "bg-amber-bg text-amber-400" };
  if (leakage > 0.02) return { label: "On track", cls: "bg-blue-bg text-blue-400" };
  return { label: "Best", cls: "bg-green-bg text-emerald-400" };
};

import type { Panel } from "../components/Sidebar";

interface Props {
  onAskAI: (q: string) => void;
  onNavigate: (panel: Panel) => void;
}

export default function PricingLeakage({ onAskAI, onNavigate }: Props) {
  const m = data.metrics;

  return (
    <div>
      <TopBar title="Pricing Leakage" criticalCount={3} onNavigateOverview={() => onNavigate("overview")} />
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Avg Leakage" value={pct(m.avg_leakage)} delta={`Threshold: ${pct(m.price_leakage_threshold)}`} status="critical" />
        <MetricCard label="Revenue at Risk" value={fmt(m.revenue_at_risk)} status="critical" />
        <MetricCard label="Reps Above Threshold" value={String(m.reps_above_threshold)} status="at-risk" />
        <MetricCard label="Top-Quartile Leakage" value={pct(m.top_quartile_leakage)} status="on-track" />
      </div>

      <div className="bg-navy-surface/50 border border-white/10 rounded-xl overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-5 py-3 text-xs font-medium text-white/50">Rep</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/50">Segment</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-white/50">Deals</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-white/50">Avg Discount</th>
              <th className="px-5 py-3 text-xs font-medium text-white/50">Leakage</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-white/50">Leakage %</th>
              <th className="text-center px-5 py-3 text-xs font-medium text-white/50">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...data.reps].sort((a, b) => b.leakage - a.leakage).map((rep) => {
              const status = getStatusPill(rep.leakage);
              return (
                <tr key={rep.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-5 py-3 text-white font-medium">{rep.name}</td>
                  <td className="px-5 py-3 text-white/70">{rep.segment}</td>
                  <td className="px-5 py-3 text-right text-white/70">{rep.deals}</td>
                  <td className="px-5 py-3 text-right text-white/70">{pct(rep.avg_discount)}</td>
                  <td className="px-5 py-3">
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${Math.min(rep.leakage / 0.15 * 100, 100)}%`,
                          backgroundColor: rep.leakage > 0.1 ? "#E02020" : rep.leakage > 0.05 ? "#f59e0b" : "#10b981",
                          opacity: 0.6 + rep.leakage * 2,
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-white font-medium">{pct(rep.leakage)}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${status.cls}`}>{status.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AIRecommendation
        title="AI Recommendations"
        content={`Pricing leakage is concentrated in Enterprise: J. Patel (14.8%) and M. Torres (12.1%) are discounting at 2–3x the acceptable threshold. Immediate interventions:

1. Implement mandatory deal desk review for any discount above 8% on Enterprise deals
2. Introduce tiered discount authority: reps ≤5%, managers ≤10%, VP sign-off above 10%
3. Run targeted pricing coaching with Patel and Torres — deal volume is strong, so the issue is negotiation technique

Estimated revenue recovery: $312K annually by bringing top two leakers to threshold.`}
        onAsk={() => onAskAI("Where is the biggest pricing leakage?")}
      />
    </div>
  );
}
