# Forecasting 2.0 Demo - Feature Roadmap

## Core Features (Completed)
- ✅ Portfolio → Categories → SKUs → SKU Detail navigation
- ✅ Risk cards with semantic borders
- ✅ SKU detail: Action card, Stock & Risk, Margin/Price/Diagnostics
- ✅ Historical Performance with competitor overlays
- ✅ Forward Projection chart
- ✅ Retailer-level optimization (tabs + share visualization)
- ✅ Dark mode by default
- ✅ APP_VERSION cache-busting

---

## Future Features

### 1. Excel Export for SKU Data
**Goal**: Support analysis at scale by allowing users to export SKU tables and forecasts.

**Scope**:
- Add "Export to Excel" button on SKUs table view
- Include all visible columns: SKU name, revenue, units, miss rate, confidence, action
- Optional: Add forecast data (next 3 months projection) to export

**Acceptance**:
- Clean Excel file downloads with proper headers
- Works across major browsers
- Preserves filters (category/subcategory selection)

---

### 2. Manufacturer-Aware Ordering
**Goal**: Align reorder actions with supply sources to streamline procurement.

**Scope**:
- Add "Manufacturer" field to SKU data model
- Show manufacturer name on SKU detail page (in Margin & Profitability or new card)
- Update "Execute Reorder" action to include manufacturer info in modal
- Optional: Group reorder recommendations by manufacturer on homepage

**Acceptance**:
- Manufacturer visible on SKU detail
- Reorder modal shows: "Reorder 340 units from [Manufacturer Name]"
- Data model supports multiple manufacturers per SKU (future-proof)

---

### 3. Seasonal/Focused Product Tracking
**Goal**: Track campaigns and promotions with focused product lists.

**Scope**:
- Add "Campaign" or "Tag" filter on SKUs view (e.g., "Holiday 2025", "Back to School")
- Show campaign badge on SKU cards in table
- Optional: Campaign performance summary card on Categories view

**Acceptance**:
- Users can filter SKUs by campaign tag
- Campaign badge visible in SKU table
- URL persists campaign selection (`?campaign=holiday2025`)

---

### 4. Similar SKU Comparison with Returns/Reviews
**Goal**: Guide product rationalization decisions by comparing similar SKUs.

**Scope**:
- Expand "Compare with..." dropdown to show returns rate and avg review score
- Add "Returns" and "Reviews" columns to comparison overlay legend
- Highlight underperforming SKUs (high returns, low reviews) with warning badge
- Optional: "Rationalization Candidates" insight card on homepage

**Acceptance**:
- Comparison overlay shows returns % and review stars
- Visual indicator (e.g., red badge) for SKUs with returns >15% or reviews <3.5
- Decision support: "Consider discontinuing [SKU] - high returns, low reviews"

---

### 5. Benchmark Data Integration (Stretch Goal)
**Goal**: Provide external context by integrating industry benchmark data.

**Scope**:
- Show category-level benchmarks on Categories view (e.g., "Industry avg: 12% growth")
- Add "vs Benchmark" badge on SKU performance (above/below industry avg)
- Optional: External data source integration (mock for demo)

**Acceptance**:
- Benchmark data visible on Categories and SKU views
- Clear visual distinction between internal performance and external context
- Data sources cited (e.g., "Source: Industry Report 2024")

---

### 6. AI-Guided Onboarding and Walkthroughs
**Goal**: Reduce ramp time for new users with guided tours.

**Scope**:
- Add "Take a Tour" button on homepage
- Step-by-step walkthrough: Homepage → Categories → SKU Detail → Execute Action
- Highlight key features (risk cards, competitor overlays, retailer optimization)
- Optional: Contextual tips on first visit (e.g., "Click any SKU to see detailed forecast")

**Acceptance**:
- Tour can be triggered manually or on first visit
- Clear, concise steps (max 5-7)
- Dismissible and resumable

---

### 7. AI-Generated Action Plans
**Goal**: Answer "what should I do?" directly with AI-generated action plans at SKU/category level.

**Scope**:
- Add "Action Plan" section on SKU detail page
- AI-generated bullets:
  - Prioritized actions (1. Reorder, 2. Markdown top competitor, 3. Monitor reviews)
  - Rationale for each action (e.g., "Reorder now - WOS 3.2, forecast lift +22%")
  - Timeline recommendation (e.g., "Execute by [Date]")
- Optional: Category-level action plan on Categories view

**Acceptance**:
- Action plan visible on SKU detail
- Clear, actionable language (no jargon)
- Prioritized (1, 2, 3) with rationale

---

### 8. Process Builder Integration
**Goal**: Enable future automation of tasks like reordering and markdown via process builder.

**Scope**:
- Add "Automate This Action" toggle in Execute Action modal
- Show preview: "If [condition], then [action]" (e.g., "If WOS < 3, then Reorder 340 units")
- Mock integration with process builder UI (out of scope: actual automation)
- Optional: "Automated Actions" summary card on homepage

**Acceptance**:
- "Automate" toggle visible in action modal
- Preview shows condition + action clearly
- UI indicates this is a future capability (e.g., "Coming Soon" badge)

---

## Notes
- All features assume static/demo data unless otherwise specified
- Prioritize visual polish and intuitive UX over backend integration
- Each feature should include a "fake it till you make it" implementation suitable for demo
