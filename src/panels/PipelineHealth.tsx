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

export default function PipelineHealth({ onAskAI, onNavigate }: Props) {
  const m = data.metrics;
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const funnelData = data.pipeline.stages.map((stage, i) => ({
    name: stage,
    value: data.pipeline.counts[i],
    conversion: i > 0 ? data.pipeline.counts[i] / data.pipeline.counts[i - 1] : 1,
  }));

  const segmentData = Object.entries(data.win_rate_by_segment).map(([name, rate]) => ({
    name,
    rate: +(rate * 100).toFixed(0),
  }));

  const getBarColor = (rate: number) => {
    const target = m.win_rate_target * 100;
    if (rate >= target) return "#10b981";
    if (rate >= target - 10) return "#f59e0b";
    return "#E02020";
  };

  const getConversionColor = (rate: number) => {
    if (rate >= 0.6) return "text-white/70";
    if (rate >= 0.45) return "text-amber-400";
    return "text-bain-red-light";
  };

  return (
    <div>
      <TopBar title="Pipeline Health" criticalCount={3} onNavigateOverview={() => onNavigate("overview")} />
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Pipeline" value={fmt(m.total_pipeline)} status="on-track" />
        <MetricCard label="Avg Sales Cycle" value={`${m.avg_sales_cycle} days`} status="at-risk" />
        <MetricCard label="Win Rate" value={pct(m.win_rate)} delta={`Target: ${pct(m.win_rate_target)}`} status="critical" />
        <MetricCard label="No-Decision Rate" value={pct(m.no_decision_rate)} status="at-risk" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-navy-surface/50 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Funnel Conversion</h3>
          <div className="space-y-2">
            {funnelData.map((stage, i) => (
              <div key={stage.name} className="flex items-center gap-3">
                <span className="text-xs text-white/50 w-28 shrink-0">{stage.name}</span>
                <div className="flex-1 bg-white/5 rounded-full h-7 relative overflow-hidden">
                  <div
                    className="h-full bg-navy-light/60 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(stage.value / funnelData[0].value) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">{stage.value}</span>
                  </div>
                </div>
                {i > 0 && (
                  <span className={`text-xs w-12 text-right ${getConversionColor(stage.conversion)}`}>
                    {(stage.conversion * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-surface/50 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Win Rate by Segment</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={segmentData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" domain={[0, 60]} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} width={80} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: "#002F6C", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="rate" radius={[0, 4, 4, 0]} cursor="pointer" onClick={(d) => setSelectedSegment(d.name)}>
                {segmentData.map((entry) => (
                  <Cell key={entry.name} fill={getBarColor(entry.rate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {selectedSegment && (
            <p className="text-xs text-white/40 mt-2">Filtered to: {selectedSegment} — funnel view would update in production.</p>
          )}
        </div>
      </div>

      <AIRecommendation
        title="AI Diagnosis"
        content="Win rate erosion is concentrated in Enterprise (23%) and Strategic (18%) segments, where deals are stalling at the Proposal stage. Root cause analysis indicates insufficient executive sponsorship and elongated procurement cycles. Mid-market and SMB segments remain healthy, suggesting the issue is deal complexity management, not product-market fit."
        onAsk={() => onAskAI("Why is our win rate declining?")}
      />
    </div>
  );
}
