import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import MetricCard from "../components/MetricCard";
import AIRecommendation from "../components/AIRecommendation";
import TopBar from "../components/TopBar";
import { data } from "../data";
import { useState } from "react";

const pct = (n: number) => `${(n * 100).toFixed(0)}%`;
const fmt = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`;

import type { Panel } from "../components/Sidebar";

interface Props {
  onAskAI: (q: string) => void;
  onNavigate: (panel: Panel) => void;
}

export default function SalesCoverage({ onAskAI, onNavigate }: Props) {
  const m = data.metrics;
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regionData = Object.entries(data.coverage_by_region).map(([name, rate]) => ({
    name,
    rate: +(rate * 100).toFixed(0),
  }));

  const getColor = (rate: number) => {
    if (rate >= 80) return "#10b981";
    if (rate >= 60) return "#f59e0b";
    return "#E02020";
  };

  return (
    <div>
      <TopBar title="Sales Coverage" criticalCount={3} onNavigateOverview={() => onNavigate("overview")} />
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Uncovered Territories" value={String(m.uncovered_territories)} status="critical" />
        <MetricCard label="Revenue in Gap Zones" value={fmt(m.revenue_in_gaps)} status="critical" />
        <MetricCard label="Top Rep Quota Ratio" value={`${m.top_rep_quota_ratio}x`} status="at-risk" />
        <MetricCard label="Accounts Touched (Q)" value={pct(m.accounts_touched_pct)} status="at-risk" />
      </div>

      <div className="bg-navy-surface/50 border border-white/10 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-white/70 mb-4">Coverage by Region</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={regionData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} width={90} />
            <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: "#002F6C", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff" }} />
            <Bar dataKey="rate" radius={[0, 4, 4, 0]} cursor="pointer" onClick={(d) => setSelectedRegion(d.name)}>
              {regionData.map((entry) => (
                <Cell key={entry.name} fill={getColor(entry.rate)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {selectedRegion && (
          <p className="text-xs text-white/40 mt-2">Drill-down: {selectedRegion} — individual account coverage detail would load in production.</p>
        )}
      </div>

      <AIRecommendation
        title="AI Recommendations"
        content={`West (29%) and Southwest (38%) are critically undercovered, with $3.2M in revenue at risk. Specific accounts flagged:

1. Reassign 2–3 accounts from over-covered Northeast (91%) to West region reps — prioritize accounts with active pipeline
2. Deploy a 30-day territory blitz in Southwest with dedicated SDR support targeting the 15 highest-value dormant accounts
3. Flag all accounts with zero contact in 30+ days for automatic escalation to regional sales director

Estimated impact: $1.1M of currently dark revenue back into active pipeline within 60 days.`}
        onAsk={() => onAskAI("Which territories need immediate coverage?")}
      />
    </div>
  );
}
