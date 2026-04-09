# Commercial Pulse

**AI-Native Commercial Health Intelligence Platform**

Commercial Pulse is a diagnostic platform that surfaces the highest-leverage intervention points across a client's sales, pricing, and marketing functions — replacing weeks of manual data wrangling with a structured, AI-powered diagnostic ready in hours.

## The Problem

Management consulting firms spend 30–40% of engagement time on data cleaning and model building that should be automated. Each engagement reinvents the same diagnostic framework with no shared starting point. Insight quality varies by individual analyst skill, not by systematic methodology. Client executives receive static decks they can't explore, and depend on the consulting team to recut analysis when business questions change.

## What Commercial Pulse Does

Commercial Pulse productizes the commercial excellence diagnostic methodology into a reusable, AI-powered platform:

- **Overview Dashboard** — Four key metric cards (pipeline at risk, win rate, price leakage, marketing-influenced revenue) with AI-generated insights ranked by severity
- **Pipeline Health** — Funnel visualization, win rate by segment, and AI root cause analysis for deal stall patterns
- **Pricing Leakage** — Rep-level leakage table with status pills, visual leakage bars, and AI-recommended interventions with estimated revenue recovery
- **Sales Coverage** — Territory coverage gaps by region with drill-down, flagging accounts with zero rep contact
- **Marketing ROI** — Channel ROAS comparison with attribution model selector and budget reallocation recommendations
- **AI Advisor** — Conversational intelligence layer with pre-built quick questions and deep-link integration from all screens

Every AI response follows a structured format: root cause diagnosis → specific numbered recommendations → quantified impact estimate.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Build | Vite |
| Deployment | AWS Amplify |
| Data (MVP) | Hardcoded JSON (swap for CRM API in v2) |

## Live App

Deployed on AWS Amplify: [https://main.d1raet95jjfn25.amplifyapp.com](https://main.d1raet95jjfn25.amplifyapp.com)

## Design

- **Palette**: Deep Navy (#002F6C), Clean White, Bain Red (#E02020) for critical highlights
- **Desktop-first**: Minimum width 1024px
- **Persistent sidebar** with client context and critical gap alerts
