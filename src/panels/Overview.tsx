import MetricCard from "../components/MetricCard";
import InsightCard from "../components/InsightCard";
import TopBar from "../components/TopBar";
import { data } from "../data";
import type { Panel } from "../components/Sidebar";

const fmt = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`;
const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

interface Props {
  onNavigate: (panel: Panel) => void;
  onAskAI: (question: string) => void;
}

export default function Overview({ onNavigate, onAskAI }: Props) {
  const m = data.metrics;
  const pipelineDelta = m.pipeline_at_risk - m.pipeline_at_risk_prior;
  const winDelta = m.win_rate - m.win_rate_prior;

  const insights = [
    {
      title: "Enterprise win rate critically below target",
      description: "Enterprise segment win rate at 23% vs. 37% target — executive sponsorship gaps identified as primary root cause.",
      severity: "critical" as const,
      question: "Why is our win rate declining?",
    },
    {
      title: "Pricing leakage 64% above threshold",
      description: "Average leakage at 8.2% vs. 5% threshold. Two Enterprise reps account for 68% of total leakage.",
      severity: "critical" as const,
      question: "Where is the biggest pricing leakage?",
    },
    {
      title: "West & Southwest territories critically undercovered",
      description: "29% and 38% coverage respectively — $3.2M revenue sitting in gap zones with minimal rep engagement.",
      severity: "critical" as const,
      question: "Which territories need immediate coverage?",
    },
    {
      title: "Webinar channel outperforming at 4.8x ROAS",
      description: "Webinar delivers 4.8x return while Display/Social returns only 1.0x — significant reallocation opportunity.",
      severity: "opportunity" as const,
      question: "How should we reallocate marketing budget?",
    },
  ];

  return (
    <div>
      <TopBar title="Overview Dashboard" criticalCount={3} />
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Pipeline at Risk"
          value={fmt(m.pipeline_at_risk)}
          delta={`+${fmt(pipelineDelta)} vs prior Q`}
          status="critical"
        />
        <MetricCard
          label="Win Rate"
          value={pct(m.win_rate)}
          delta={`${(winDelta * 100).toFixed(0)}pp vs prior Q`}
          status="critical"
        />
        <MetricCard
          label="Price Leakage"
          value={pct(m.price_leakage_pct)}
          delta={`Threshold: ${pct(m.price_leakage_threshold)}`}
          status="at-risk"
        />
        <MetricCard
          label="Mktg-Influenced Revenue"
          value={fmt(m.mktg_influenced_rev)}
          delta={`+${fmt(m.mktg_influenced_rev - m.mktg_influenced_rev_prior)} vs prior Q`}
          status="on-track"
        />
      </div>

      <h3 className="text-sm font-semibold text-white/70 mb-3">AI-Generated Insights</h3>
      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard
            key={insight.title}
            title={insight.title}
            description={insight.description}
            severity={insight.severity}
            onAsk={() => {
              onAskAI(insight.question);
              onNavigate("advisor");
            }}
          />
        ))}
      </div>
    </div>
  );
}
