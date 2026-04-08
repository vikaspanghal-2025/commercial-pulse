export const aiResponses: Record<string, string> = {
  "Why is our win rate declining?": `Your win rate has dropped to 31% — 6 points below target — driven primarily by Enterprise and Strategic segments where complex deal cycles are stalling at the Proposal stage due to insufficient executive sponsorship and competitive displacement by incumbents.

1. **Mandate executive sponsor mapping** on every Enterprise deal above $200K before advancing past Discovery — this alone closes the sponsorship gap that's killing 40% of your stalled proposals.
2. **Deploy competitive battle cards** for the top 3 incumbents in Strategic accounts, updated weekly by your competitive intelligence team.
3. **Compress the Proposal-to-Negotiation stage** by pre-negotiating commercial terms during Discovery — target a 30% reduction in stage duration.

**Impact estimate:** Fixing the executive sponsorship gap on Enterprise deals alone would recover approximately $480K in pipeline currently at risk, lifting win rate by 3–4 points this quarter.`,

  "Where is the biggest pricing leakage?": `Your pricing leakage is concentrated in the Enterprise segment where two reps — J. Patel (14.8%) and M. Torres (12.1%) — are discounting at 2–3x the acceptable threshold, driven by a lack of deal desk governance on contracts above $100K.

1. **Implement mandatory deal desk review** for any discount above 8% on Enterprise deals — this catches the top two leakage sources immediately.
2. **Introduce tiered discount authority**: reps can approve up to 5%, managers up to 10%, VP sign-off required above 10%.
3. **Run a pricing coaching session** with Patel and Torres specifically — their deal volume is strong, so the issue is negotiation technique, not pipeline quality.

**Impact estimate:** Bringing Patel and Torres to the 5% threshold would recover approximately $312K in annual revenue leakage.`,

  "Which territories need immediate coverage?": `West (29%) and Southwest (38%) regions are critically undercovered, representing $3.2M in revenue sitting in gap zones with zero or minimal rep engagement — this is your single largest near-term revenue risk.

1. **Reassign 2–3 accounts from the over-covered Northeast** (91% coverage) to West region reps immediately — prioritize accounts with active pipeline.
2. **Deploy a territory-specific blitz** in Southwest: 30-day sprint with dedicated SDR support to re-engage the 15 highest-value dormant accounts.
3. **Flag all accounts with zero contact in 30+ days** for automatic escalation to the regional sales director.

**Impact estimate:** Covering the top 10 gap-zone accounts in West and Southwest would put approximately $1.1M of currently dark revenue back into active pipeline within 60 days.`,

  "How should we reallocate marketing budget?": `Your marketing spend is misallocated: Display/Social is returning 1.0x ROAS (below breakeven after overhead) while Webinar delivers 4.8x — yet budget allocation doesn't reflect this 5:1 performance gap.

1. **Shift 40% of Display/Social budget to Webinar and Paid Search** — these channels have proven scalability and the highest conversion-to-pipeline rates.
2. **Pause all Display/Social spend below 1.5x ROAS** for 30 days and measure pipeline impact — if pipeline doesn't drop, make the cut permanent.
3. **Double down on Content/SEO** (3.0x ROAS) with a dedicated content sprint targeting your top 3 buyer personas in Enterprise segment.

**Impact estimate:** Reallocating $200K from Display/Social to Webinar would generate approximately $760K in additional marketing-influenced revenue based on current ROAS ratios.`,
};

export const defaultResponse = `Based on the data patterns I'm seeing, Meridian Industrial has three interconnected commercial health issues: pricing discipline in Enterprise, territory coverage gaps in western regions, and marketing budget misallocation toward low-ROAS channels.

1. **Start with pricing governance** — it's the fastest path to recovered revenue with the least organizational disruption. Implement deal desk review for discounts above 8%.
2. **Run a 30-day territory coverage blitz** in West and Southwest to re-engage dormant high-value accounts before quarter-end.
3. **Reallocate 40% of Display/Social budget** to your top-performing Webinar and Paid Search channels.

**Impact estimate:** These three interventions together represent approximately $2.1M in recoverable or incremental revenue over the next two quarters.`;

export const quickQuestions = [
  "Why is our win rate declining?",
  "Where is the biggest pricing leakage?",
  "Which territories need immediate coverage?",
  "How should we reallocate marketing budget?",
];
