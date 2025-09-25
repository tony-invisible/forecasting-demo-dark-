# Forecasting 2.0 – Roadmap

This file tracks scope, milestones, acceptance criteria, data model, URL rules, and key decisions. We ship one step at a time; each step should be demo‑ready.

## Goals
- Portfolio → Category → SKU drilldown that feels intuitive
- Clear comparisons and context (relative to category, peers, retailers)
- Actionable insights, not raw data dumps

## Non‑Goals (for now)
- Server/DB integration (demo uses in‑memory/fake data)
- Auth/multi‑tenant concerns

## Rollback Reference
- Stable tag: `v2.0-stable-2025-09-25`
- Stable branch: `stable/v2.0-2025-09-25`

## URL Rules
- Clean homepage: `/forecasting-demo/` (no params)
- Filters via query params only when active: `?view=category&cat=electronics&sub=phones`
- Back/forward must restore state (charts render after DOM injection)

## Milestones

### 1) Category and Subcategory Filtering (current)
Scope:
- Add taxonomy: category → subcategory
- UI controls to filter by subcategory; update SKUs and category chart
- URL params: `cat`, `sub`; support deep linking

Acceptance Criteria:
- Selecting a subcategory updates the SKU table and the Category Performance chart
- URL reflects `cat` and `sub`; back/forward navigates correctly
- Clean homepage URL remains clean

### 2) SKU Detail – Margin & Confidence
Scope:
- Add fake per‑retailer margin inputs; compute blended margin
- Display model confidence next to historical/forecast

Acceptance Criteria:
- "Margin & Profitability" card shows blended margin and profit trend
- Confidence shown in charts or adjacent badge

### 3) Competitor/Substitution Overlay
Scope:
- “Compare with” on SKU detail; overlay 1–2 competitor lines

Acceptance Criteria:
- Overlay draws with distinct colors/legend; toggle on/off

### 4) Comparison & Contextualization
Scope:
- Multi‑SKU comparison chart from Category view
- Category‑relative performance badges (Above/Below Avg, percentile)
- Contextual events (Holiday, Promo, Discontinuation) with markers/tooltips

Acceptance Criteria:
- Compare 2–4 SKUs; events render on timeline; badges compute vs category last 3 months

### 5) Retailer‑Level Optimization
Scope:
- Per‑retailer time series (Walmart/Amazon/Target demo)
- Segmented control to view per‑retailer performance and suggestions

Acceptance Criteria:
- Switching retailer updates chart/KPIs; URL persists retailer param

### 6) Proactive Insights
Scope:
- Heuristics to detect anomalies/trends; narrative with recommended actions

Acceptance Criteria:
- At least 3 actionable insights with reasons; click navigates to relevant view/SKU

### 7) QA, A11y, and Polish
Scope:
- Verify deep‑linking, unmount/remount, keyboard focus, labels

Acceptance Criteria:
- No console errors; charts render on every route change; basic a11y labels present

## Data Model (demo / in‑memory)
- Categories: `electronics`, `clothing`, `toys`
- Subcategories: 3–5 per category (to be finalized)
- Retailers: `walmart`, `amazon`, `target`
- SKU: `{ id, name, category, subcategory, series: { overall: [...], perRetailer: {...} }, confidence, margin: { perRetailer, blended }, competitors: [ids], events: [{ date, type, label }] }`

## Decision Log
- 2025‑09‑25: Use clean homepage URL; only add params when filters active
- 2025‑09‑25: Recharts UMD + in‑memory data acceptable for demo

## Open Questions
1. Subcategories per category – provide list or proceed with proposed defaults?
2. Retailers – confirm initial set (Walmart, Amazon, Target)?
3. Margin – use simple gross margin% per retailer? Any constraints?
4. Comparison – cap overlays at 2 or allow up to 4?
5. Events – event types to prioritize (Holiday, Promo, Price change, Discontinuation)?
6. Confidence – keep percent plus band on projection chart?
7. Copy – preferred tone for insights (neutral enterprise vs directive)?


