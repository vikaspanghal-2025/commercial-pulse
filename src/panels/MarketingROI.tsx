import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import MetricCard from "../components/MetricCard";
import AIRecommendation from "../components/AIRecommendation";
import TopBar from "../components/TopBar";
import { data } from "../data";
import { useState } from "react";

const fmt = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`;

import type { Panel } from "../components/Sidebar";

interface Props {
  onAskAI: (q: string) => void;
  onNavigate: (panel: Panel) => void;
}

export default function MarketingROI({ onAskAI, onNavigate }: Props) {
  const m = data.metrics;
  const [attribution, setAttribution] = useState<"linear" | "first" | "last">("linear");

  const channelData = Object.entries(data.channel_roas).map(([name, roas]) => ({
    name,
    roas: +roas.toFixed(1),
  }));

  const getColor = (roas: number) => {
    if (roas >= 2.5) return "#10b981";
    if (roas >= 1.5) return "#f59e0b";
    return "#E02020";
  };

  return (
    <div>
      <TopBar title="Marketing ROI" criticalCount={3} onNavigateOverview={() => onNavigate("overview")} />
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Mktg-Influenced Revenue" value={fmt(m.mktg_influenced_rev)} status="on-track" />
        <MetricCard label="Blended ROAS" value={`${m.blended_roas}x`} status="on-track" />
        <MetricCard label="Blended CAC" value={`$${m.blended_cac}`} status="at-risk" />
        <MetricCard label="Top Channel" value={m.top_channel} status="on-track" />
      </div>

      <div className="bg-navy-surface/50 border border-white/10 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white/70">ROAS by Channel</h3>
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
            {(["first", "linear", "last"] as const).map((model) => (
              <button
                key={model}
                onClick={() => setAttribution(model)}
                className={`text-xs px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  attribution === model ? "bg-navy-light text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {model === "first" ? "First-touch" : model === "last" ? "Last-touch" : "Linear"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={channelData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <XAxis type="number" domain={[0, 6]} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} tickFormatter={(v) => `${v}x`} />
            <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} width={110} />
            <Tooltip formatter={(v: number) => `${v}x`} contentStyle={{ background: "#002F6C", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff" }} />
            <Bar dataKey="roas" radius={[0, 4, 4, 0]}>
              {channelData.map((entry) => (
                <Cell key={entry.name} fill={getColor(entry.roas)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/35 mt-2">Attribution model: {attribution} — model switching affects production data only.</p>
      </div>

      <AIRecommendation
        title="AI Recommendations"
        content={`Display/Social is returning 1.0x ROAS (below breakeven after overhead) while Webinar delivers 4.8x — a 5:1 performance gap that your current budget allocation doesn't reflect.

1. Shift 40% of Display/Social budget to Webinar and Paid Search — these channels have proven scalability and highest conversion-to-pipeline rates
2. Pause all Display/Social spend below 1.5x ROAS for 30 days and measure pipeline impact — if pipeline doesn't drop, make the cut permanent
3. Double down on Content/SEO (3.0x ROAS) with a dedicated content sprint targeting top 3 buyer personas in Enterprise

Estimated impact: Reallocating $200K from Display/Social to Webinar would generate ~$760K in additional marketing-influenced revenue.`}
        onAsk={() => onAskAI("How should we reallocate marketing budget?")}
      />
    </div>
  );
}
