# Forecasting 2.0 Demo - Presentation Talking Points

## Intro

Hey everyone, I'm excited to walk you through Forecasting 2.0. This is about moving from raw data to guided decisions—giving you clear signals, context, and recommended actions so you can make fast, confident decisions without all the cognitive load.

What we heard from users and stakeholders was pretty clear:
- "Too much content, not enough understanding"
- "Current is just numbers, there is no layered narrative"
- "Not visually compelling"
- And my favorite: "This is cool. What are we looking at? We don't really know what to do with this."

So we rebuilt this with a focused view that highlights what matters most and steps to take—all accessible in just a few clicks.

## Tour Feature

Before we dive in, I want to point out this "Take a Tour" button in the top right. This is an 8-step guided tour that walks new users through the entire experience. It'll explain each section, what you can click on, and how to navigate between pages. It's like having someone sitting next to you the first time you use it. You can skip it if you know what you're doing, but it's there to get people oriented fast.

## 1) Overview (Homepage)

Alright, so when you land on the Overview page, here's what you see right at the top:

### Three KPI Cards at the Top

These give you direction at a glance, with trends on the right. 
- **Total Revenue**: Last 24 months—click this and it takes you to the Categories page so you can dig into which categories are driving that.
- **Forecast Revenue**: Next 3 months—this is your forward-looking view.
- **Miss Rate**: Model vs Baseline—this tells you how accurate our forecasts are. Lower is better.

The idea is: three KPIs to get you oriented, breadcrumbs to go deeper. Overview is always one click away.

### Risk Cards - Inventory Risk & Stockout Risk

Right below that, we've got these two risk cards with red borders—because they're both risks you need to pay attention to.

- **Inventory Risk**: Shows "High" with 2 categories at risk. You can click "2 categories at risk" and it jumps you straight to the Categories page.
- **Stockout Risk**: Shows "Low" with 6 SKUs flagged. Click "6 SKUs flagged" and it takes you directly to the Toys & Games SKU list where those 6 are.

These cards surface the problems proactively and give you one-click navigation to go investigate.

### Revenue Forecast vs Actuals Chart

Below that, you've got a chart showing Actual, Baseline, and Model Forecast over time. This is your historical accuracy—you can see where the model's been right, where it's been off, and what it's projecting forward. Confidence is always visible so you know when to trust the forecast and when to dig deeper.

### Priority Actions Card

This is one of my favorite parts. We've got five priority actions stack-ranked by urgency:
- **Three red items at the top**: Sports demand surge 45%, Home & Garden overstock 18%, Toys forecast down 15%—these are urgent. Each one has a concise action like "Expedite shipment" or "Clear stock" in blue so you know it's clickable.
- **One yellow item**: Clothing confidence low—this is a warning, needs investigation.
- **One green item at the bottom**: Electronics category up 22%—this is positive, just FYI.

So it's red, red, red, yellow, green—most urgent first. And all those action statements are clickable blue links. They don't go anywhere in the demo, but the intent is clear: these are the things you should do something about.

### View Categories Card

On the right, we've got a visual card for each category—Electronics, Clothing, Toys & Games. Each mini-card shows:
- An icon
- Revenue amount
- Forecast percentage with color-coding (green for up, red for down)
- Color-coded left border

Click any category and you jump to the full category detail page.

---

## 2) Categories Page

So if you click Total Revenue or one of the category cards, you land here. This is where you drill down into category performance.

### Three Category Cards

Each card is concise and gives you a clear verb—what to do:
- **Electronics**: Revenue $850K, Forecast +22%, Confidence High (87%). Says "Supply down. Reorder now."
- **Clothing**: Revenue $420K, Forecast -8%, Confidence Low (35%). Says "Sparse history. Investigate."
- **Toys & Games**: Revenue $180K, Forecast -15%, Confidence High (78%). Says "Overstock risk (WOS > 8). Apply markdown."

Each card has a "View SKUs" button that takes you to the SKU list for that category.

### Category Performance Chart

Below the cards, there's a chart that shows you the category performance over time—Actuals, Baseline, and Model Forecast. You can toggle between viewing a specific category or the entire portfolio using the tabs at the top right.

---

## 3) SKUs List

When you click "View SKUs" on a category, you get to this table. This is intentionally simple—name, revenue, units, miss rate, confidence, and an action for each SKU.

### Campaign Filter

At the top right, there's a Campaign dropdown. You can filter by:
- All Campaigns
- Holiday 2025
- Back to School
- Summer Sale

This lets you slice the data by what's relevant to the current planning cycle.

### SKU Table

Each row shows:
- SKU name with campaign tags (like "Holiday 2025" or "Summer Sale")
- Revenue and units sold
- Miss rate and confidence
- VS Benchmark percentage (green if above, red if below)
- Action button: **Markdown**, **Reorder**, **Investigate**, or **Hold**

Click any SKU row and you go to the SKU Detail page.

---

## 4) SKU Detail

This is where it gets really rich. Let's say you click on "Hot Wheels Pack"—here's what you see:

### Recommended Action Card (Top)

Big blue card at the top says **"Reorder 340 units"** with context:
- LM +21%, Confidence 87%, WOS 3.2
- Bullet points explaining why: Forecast lift +22%, confidence 87%, weeks of supply 3.2 < target 6
- "Execute Reorder (340 units)" button right there—you can take action immediately
- "View calculation" link if you want to see the math

### Stock & Risk (Right Sidebar)

Shows you:
- Stock on hand: 380 units
- Weeks of supply: 3.2
- Target WOS: 6
- Risk level: Medium
- Stock vs target: 53% (with a progress bar)

### Retailer Tabs - Walmart, Amazon, Target

You can compare performance across retailers. Each tab shows historical performance and lets you see which retailer is driving the most revenue or has the best margin.

### Historical Performance Chart

Shows Actuals, Baseline, and Model over time, with promo and holiday events marked. You can add comparison overlays using the "Compare with..." dropdown.

### Forward Projection Chart

Shows the near-term path—upper and lower confidence bounds, and the forecast. Confidence is explicit and always visible.

### Margin & Profitability

Blended margin 34%, broken out by retailer:
- Walmart: 31%
- Amazon: 36%
- Target: 34%

### Price & Cost

Manufacturer (Mattel), Avg Price $992, Landed Cost $660, Gross Profit $332. There's a visual bar showing cost vs price split.

### Model Diagnostics

Shows Model MAPE 8.2%, Baseline MAPE 15.7%, Improvement +47.6%. This tells you how much better the model is than just using a naive baseline.

### Performance vs Benchmark

Three quick cards:
- Revenue Growth: This SKU 22%, Industry 15% → +47% vs benchmark
- Gross Margin: This SKU 24%, Industry 19% → +26% vs benchmark
- Forecast Accuracy: This SKU 91.8%, Industry 84.3% → +9% vs benchmark

### AI-Generated Action Plan

This is the magic. Four recommended actions with urgency and context:
1. **Execute Reorder Now** - Within 48 hours. WOS at 3.2, forecast shows +22% demand lift.
2. **Monitor Competitor Pricing** - Review by Nov 15. Top competitor priced 8% lower.
3. **Optimize Amazon Allocation** - Within 1 week. Amazon showing 38% projected share but underallocated.
4. **Review Customer Feedback** - Within 2 weeks. Rating at 4.2/5, recent uptick in returns.

Each has a **"Take Action"** button on the right.

### Retailer Optimization

Shows suggested focus: **Walmart** (42% projected share in next 3 months), with a breakdown of Amazon 38% and Target 20%.

### Action Automation Modal

When you click "Take Action" on any AI-generated action, you get a modal that says:
- "This will queue a reorder of 340 units. The ops team will be notified within the next hour."
- **Automate This Action (BETA)** toggle: "If Weeks of Supply < 4.0, Then Auto-reorder"
- Cancel or Proceed buttons

If you proceed, you get a success message: "Action automated successfully! You'll receive a confirmation email shortly."

This is about moving from insight to execution—no more copying numbers into an email or Slack.

---

## Value Framing (Tie Back to Goals)

So let me tie this back to what we set out to do:

1. **Replace the current overload of information with a focused view**: We did that. Priority Actions surfaces what matters most. You're not hunting through tabs.

2. **Present information clearly and concisely so users can make fast, confident decisions**: Every card has a clear verb—Reorder, Investigate, Apply markdown. No ambiguity.

3. **Highlight Neurons insights with explicit recommended actions**: The AI-Generated Action Plan does exactly this. It's not just "here's some data"—it's "do this, by this date, here's why."

4. **Progressive disclosure keeps cognitive load low**: You start at Overview, drill into Categories, then SKUs, then SKU Detail. Details expand only when needed.

5. **Comparisons, events, and retailer splits provide just-in-time depth**: All there when you need it, hidden when you don't.

---

## What's Next (Set Expectations)

Right now, this is a high-fidelity demo. The "Take Action" buttons queue actions in a workflow, but they don't actually integrate with ERP or OMS yet.

Next steps we're planning:
- **Multi-SKU compare from the SKUs table**: Select multiple SKUs and compare trajectories side-by-side.
- **Finish URLs and persist retailer scope**: If you're looking at Walmart, stay in that context as you navigate.
- **QA the automation workflows**: Make sure the rules engine is bulletproof before we go live.

But the core experience is here. It's fast, it's confident, and it tells you what to do.

---

## Close

So that's Forecasting 2.0. We moved from raw data to guided decisions. Clear signal, context, and recommended action—all in just a few clicks. Happy to take questions or walk through any specific flow in more detail.

