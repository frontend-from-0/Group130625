# Fintrack — Product Requirements Document

| Field | Value |
|-------|-------|
| **Product** | Fintrack |
| **Version** | 0.2 (MVP scope derived from design) |
| **Author** | Product (derived from Figma design analysis) |
| **Design source** | [Fintrack — budgeting app (Community)](https://www.figma.com/design/p0LhPv5Pjadk6DljfJ3Wjv/Fintrack-app---budgetting-app--Community-?node-id=0-1) |
| **MVP platform** | Responsive web application (desktop + mobile browsers) |
| **Date** | 2026-06-08 |
| **Status** | Draft for engineering & design alignment |

---

## 1. Executive summary

Fintrack is a **responsive web application** that combines **account balance visibility**, **envelope-style monthly budgeting**, and **spending insights** in a single home experience. Users access the product in a modern browser on **desktop and mobile** — one codebase, no native app install required for MVP.

The Figma design covers the core budgeting loop — from first-time budget setup through ongoing spend tracking, category drill-down, and limit adjustments — but leaves adjacent product surfaces (Cards, Rewards, Profile, money movement) as navigation placeholders. Visual designs are mobile-width (~315 px); engineering adapts them to a responsive layout for larger viewports.

**MVP recommendation:** Ship the **budgeting & spending insight** vertical as a responsive web app before expanding into card/rewards ecosystems or native mobile clients. This mirrors how successful fintech products (MoneyPro, Klarna's budgeting features, Stripe's focus on a single money job) win trust: nail one high-frequency job — *"Am I on track this month?"* — before layering growth mechanics.

**Platform constraint:** Native iOS/Android applications are **out of scope for MVP** due to budget. A installable PWA (add-to-home-screen) is acceptable as a lightweight enhancement but not a separate deliverable.

---

## 2. Problem statement

### User problem
Consumers with multiple accounts and irregular spending struggle to answer three questions daily:
1. How much money do I actually have?
2. How much can I still spend this month?
3. Which categories are drifting off plan?

Spreadsheets and generic banking apps surface balances but rarely connect them to **actionable monthly envelopes** with real-time progress and overspend signals.

### Business opportunity
Budgeting apps with strong activation (first budget created within 7 days) retain 2–3× better than balance-only viewers. Fintrack's design optimizes for that activation moment via a prominent home CTA ("Set a financial budget") and a guided multi-step budget builder.

### Design-validated hypothesis
If users can set a monthly budget with category splits in under 2 minutes, then see spend progress on the home screen, they will return weekly to check "left to spend" — creating a habit loop before monetization (premium insights, card partnerships, rewards).

---

## 3. Target users & personas

| Persona | Description | Primary job-to-be-done |
|---------|-------------|------------------------|
| **Budget beginner (Parzival)** | Young professional, first structured budget | "Help me not overspend without becoming an accountant" |
| **Envelope optimizer** | Already categorizes spend (YNAB / MoneyPro refugees) | "Show me category-level burn rate and let me fix limits fast" |
| **Multi-account aggregator** | Uses TransferWise/Wise, multiple inflows | "One balance view + categorized outflows" |

**Primary persona for MVP:** Budget beginner — design copy ("Good Morning, {name}", "Set up now", suggested category chips) is educational, not power-user dense.

**Out of scope for MVP persona:** Business expense management, joint household budgets, investment tracking.

---

## 4. Product vision & principles

### Vision
*Clarity before complexity* — every screen answers one financial question.

### Product principles (informed by MoneyPro / Klarna / Stripe patterns)

1. **Progressive disclosure** — Home shows summary; detail on tap (insight card → allocation → category → transactions).
2. **Safe defaults** — Pre-filled categories (General, Transportation, Charity) and amount chips ($100–$1,000) reduce blank-page anxiety.
3. **Explicit money semantics** — Green for inflows, muted gray/red for outflows; overspend states labeled ("Limit exceeded", "$250.00 over").
4. **Adjustability without shame** — "Adjust limit" and "Apply next month" acknowledge that budgets are plans, not contracts.
5. **Trust cues** — Balance masking (eye-slash), notification entry point, and clear billing-cycle choice mirror banking UX expectations.
6. **One product, every screen** — Mobile browsers get the primary touch-optimized layout from Figma; desktop gets the same features with adapted navigation and density — not a stripped-down "mobile web" experience.

---

## 5. Platform strategy (MVP)

### 5.1 Delivery model

| Dimension | MVP decision |
|-----------|--------------|
| **Primary deliverable** | Responsive web application (SPA or SSR web app) |
| **Desktop** | Supported — multi-column layouts, sidebar or top nav where appropriate |
| **Mobile** | Supported — touch-first layout aligned with Figma (~320–480 px) |
| **Tablet** | Supported via responsive breakpoints (no separate tablet design) |
| **Native iOS / Android** | Out of scope — deferred to post-PMF phase |
| **PWA** | Optional fast-follow (manifest, icons, offline shell) — not blocking MVP |

### 5.2 Responsive breakpoints (engineering guidance)

| Breakpoint | Range | Layout intent |
|------------|-------|---------------|
| **Mobile** | &lt; 768 px | Single column; bottom tab nav (per Figma); full-width cards; bottom sheets for modals |
| **Tablet** | 768–1023 px | Constrained content column (max ~480 px) centered, or two-column where insight + list fit |
| **Desktop** | ≥ 1024 px | Max content width ~1200 px; persistent side or top navigation; modals as centered dialogs; spending chart + category list side-by-side where useful |

### 5.3 Design adaptation rules

Figma assets are **mobile-reference**, not pixel-perfect desktop specs. When adapting:

- **Do not** render faux iOS status bars or home indicators on web — use standard browser chrome.
- **Do** preserve color tokens, typography hierarchy, component semantics, and interaction flows.
- **Bottom sheets** (add category, billing cycle, manage category) → bottom sheet on mobile, centered modal on desktop.
- **Numeric keypad** (adjust limit) → on-screen keypad on mobile; standard numeric input + keyboard on desktop.
- **Bottom tab bar** → bottom tabs on mobile; sidebar or top nav on desktop (same four destinations).

---

## 6. Design inventory (what Figma covers)

The file contains **one Cover artboard** with **13 distinct mobile-reference screens/states** (~315×682 px). These are the **mobile viewport source of truth**; desktop layouts are derived via the adaptation rules in §5.3.

### 6.1 Screen map

```
Home (no budget) ──► Create Budget ──► [Add Category modal] ──► Budget Success
       │                    │
       │                    └──► Amount left validation ($3,000 unallocated)
       │
       └──► Home (with Spending insight) ──► Spending allocation
                      │                              │
                      │                              └──► Category detail
                      │                                        ├──► Manage category sheet
                      │                                        └──► Adjust limit ──► Billing cycle sheet
                      └──► (Charity over-budget state with info icon)
```

### 6.2 Designed screens

| # | Screen | Key elements |
|---|--------|--------------|
| 1 | **Home — pre-budget** | Greeting, total balance ($18,987.67 USD) + hide toggle, Deposit / Transfer / More, budget CTA banner, recent transactions (3), bottom nav |
| 2 | **Home — post-budget** | Spending insight card ($3,665.80 left, progress bar, $2,335.20 of $6,000 spent), transactions |
| 3 | **Create Budget** | Total amount ($6,000), quick amount chips, category split list with per-category amounts, "Amount left: $3,000", primary CTA |
| 4 | **Create Budget + Add category** | Bottom sheet: icon picker, name field, suggestion chips (Self care, Education, Shopping, Lifestyle), color palette, "Create category" |
| 5 | **Budget success** | Checkmark, summary card (General $1k, Transportation $1k, Charity $1k, Selfcare $3k), total budgeted $6,000, CTA |
| 6 | **Spending insight / allocation** | Month selector (Jan), monthly budget $6,000, donut chart ($2,335.20 spent, $3,665.80 left), bar/ring toggle, category list with spent/limit |
| 7 | **Spending insight — over budget** | Charity row shows $1,250 / $1,000 with info icon |
| 8 | **Category detail** | Category header (icon, name, txn count), spending breakdown bar, overspend callout, filtered transactions |
| 9 | **Adjust limit** | Large amount input ($1,500), current limit reference, "Apply immediately" chip, numeric keypad, Save |
| 10 | **Set billing cycle** (sheet) | Apply immediately vs Apply next month (radio) |
| 11 | **Manage category** (sheet) | Rename category, Adjust limit, Delete category |

### 6.3 Navigation shell (designed but not specced)

**Mobile:** Bottom tabs — **Home** (active), **Cards**, **Rewards**, **Profile**.

**Desktop:** Equivalent destinations via persistent sidebar or top navigation — only Home tab has screen designs.

### 6.4 Visual system (from design tokens)

| Token | Value | Usage |
|-------|-------|-------|
| Primary brand | `#7340FE` | CTAs, active nav, links |
| Surface dark | `#181818` | Balance card |
| Text primary | `#181818` | Headings |
| Text secondary | `#929292` | Subcopy, inactive nav |
| Success / inflow | `#249A0E` | Positive amounts |
| Budget CTA bg | `rgba(239,229,255,0.8)` | Activation banner |
| Border / divider | `#F2F4F7` | Cards, nav |
| Typography | Manrope (UI), Encode Sans (balance label) | — |

---

## 7. Goals & success metrics

### North-star metric
**Weekly Active Budgeters (WAB)** — users who created a budget and viewed Spending insight ≥1× in a rolling 7-day window.

### MVP success criteria (90 days post-launch)

| Metric | Target | Rationale |
|--------|--------|-----------|
| Budget creation completion rate | ≥ 65% of users who tap "Set up now" | Funnel core to habit |
| Time to first budget | ≤ 120 seconds median | Design supports quick chips |
| D7 retention (budget creators) | ≥ 40% | Category insight drives return |
| Home → Spending insight CTR | ≥ 25% weekly | Validates insight card UX |
| Overspend alert engagement | ≥ 30% tap-through on limit exceeded | Tests anxiety → action loop |

### Counter-metrics (guardrails)
- Budget abandon rate on "Amount left ≠ $0" step — if > 40%, simplify allocation UX.
- Category delete rate — high deletion may mean bad defaults.

---

## 8. Scope

### 8.1 In scope — MVP (P0)

Aligned with designed flows, delivered as a **responsive web application** for desktop and mobile browsers.

#### Epic A: Home dashboard
- **A1** Personalized greeting (time-of-day + first name).
- **A2** Total balance display with show/hide (secure display).
- **A3** Quick actions row: Deposit, Transfer, More — **UI only in MVP**; tap shows "Coming soon" or defers to Phase 2.
- **A4** Conditional content:
  - No budget → activation banner with "Set up now".
  - Has budget → Spending insight summary card (left to spend, progress bar, spent/total).
- **A5** Recent transactions list (last 3) + "View all" navigation.
- **A6** Notification icon (badge-ready; full inbox Phase 2).

#### Epic B: Budget creation
- **B1** Set total monthly budget amount (free numeric entry + chips: $100, $200, $500, $1,000 — design shows variable chips per state).
- **B2** Distribute amount across categories (default: General, Transportation, Charity).
- **B3** Live **Amount left** indicator; block save while ≠ $0 (design shows $3,000 remaining).
- **B4** Add custom category (modal): icon, name, suggested names, color.
- **B5** Edit category allocations inline (Edit affordance on category section).
- **B6** Success confirmation with immutable summary + CTA to home.

**Business rule:** Sum(category limits) MUST equal total budget at save time.

#### Epic C: Spending insight & allocation
- **C1** Monthly budget overview with donut/ring chart and center "Spent" amount.
- **C2** Toggle chart type (bar vs ring icon pair in design).
- **C3** "Left to spend" aggregate.
- **C4** Month selector (dropdown; default current calendar month).
- **C5** Category list: name, transaction count, spent/limit ratio.
- **C6** Overspend visual treatment (spent > limit, info icon, "Limit exceeded" on detail).
- **C7** "Adjust" link → re-enter budget edit flow or category limit flow.

#### Epic D: Category detail & management
- **D1** Category header with icon, name, transaction count.
- **D2** Spending breakdown progress bar with overage copy ("$250.00 over", "$1,250 of $1,000").
- **D3** Transactions filtered to category.
- **D4** Settings gear → Manage category sheet: Rename, Adjust limit, Delete.
- **D5** Adjust limit screen with numeric keypad, current limit reference.
- **D6** Billing cycle sheet: Apply immediately vs Apply next month.

**Business rules:**
- *Apply immediately* — updates limit for current period; recalculates overspend state instantly.
- *Apply next month* — stores pending limit for next billing cycle; UI still shows current limit until rollover.
- Delete category — require zero pending transactions or offer reassignment (TBD, see Open Questions).

#### Epic E: Transactions (partial)
- **E1** Transaction row: merchant/icon, label, signed amount (green inflow, gray/red outflow).
- **E2** View all transactions list (design linked, screen not designed — build minimal list).
- **E3** Auto-categorization mapping merchant → category (backend/rules engine).

#### Epic F: App shell & responsive web platform
- **F1** Primary navigation with 4 destinations (Home, Cards, Rewards, Profile); non-Home tabs show placeholder state in MVP.
- **F2** **Mobile layout** (&lt; 768 px): bottom tab bar per Figma; touch targets ≥ 44 px; safe-area padding for notched devices.
- **F3** **Desktop layout** (≥ 1024 px): persistent sidebar or top nav with the same four destinations; content area uses available width per §5.2.
- **F4** Responsive modals/sheets: bottom sheets on mobile, centered dialogs on desktop (add category, manage category, billing cycle).
- **F5** Browser support: latest two versions of Chrome, Safari, Firefox, and Edge; iOS Safari and Chrome Android required for mobile.
- **F6** No faux native chrome — standard browser UI; app fills viewport with responsive meta viewport configuration.

#### Epic G: Responsive web quality (cross-cutting)
- **G1** All P0 flows completable on mobile (375 px) and desktop (1280 px) without horizontal scroll.
- **G2** Keyboard navigation and focus management on desktop for forms, modals, and budget allocation.
- **G3** Layout reflow at breakpoints without loss of functionality (chart, category list, transaction rows).
- **G4** URL-based routing so views are deep-linkable and browser back/forward work as expected.

### 8.2 Out of scope — MVP (P1+)

| Feature | Notes |
|---------|-------|
| **Native iOS / Android apps** | Budget constraint — evaluate after web PMF |
| Cards tab (full product) | No designs — likely card product / virtual cards (Klarna-style) |
| Rewards tab (full product) | No designs — cashback / partner rewards |
| Profile tab (full product) | No designs — settings, security, linked accounts |
| Onboarding / KYC / bank linking | Not in file; required for real balances |
| Deposit & Transfer flows | Buttons present; no screens |
| Notifications center | Icon only; web push optional Phase 2 |
| Multi-currency | USD hard-coded in design |
| Household / shared budgets | — |
| Recurring budgets / templates | — |
| Export / accountant sharing | — |
| Dedicated tablet-only layouts | Covered by responsive breakpoints, not separate designs |
| App Store / Play Store distribution | Requires native or wrapped app — post-MVP |

---

## 9. User stories & acceptance criteria

### 9.0 Cross-platform (responsive web)

**US-000** As a user on any device, I want Fintrack to work in my browser so that I do not need to install an app.

- AC: App loads and renders at 375 px, 768 px, and 1280 px widths without broken layout.
- AC: All P0 user journeys completable on mobile Safari and desktop Chrome.
- AC: No requirement to download from App Store or Play Store.

**US-000b** As a desktop user, I want efficient navigation and layout so that budgeting on a large screen feels natural.

- AC: Primary nav is always visible (sidebar or top bar) — not hidden behind a hamburger on desktop.
- AC: Spending allocation can show chart and category list concurrently at ≥ 1024 px where space allows.
- AC: Forms and modals are operable via keyboard (Tab, Enter, Escape to close).

**US-000c** As a mobile browser user, I want a touch-optimized layout so that the experience matches the Figma intent.

- AC: Bottom tab navigation on viewports &lt; 768 px.
- AC: Bottom sheets for add-category, manage-category, and billing-cycle flows.
- AC: Touch targets meet 44 px minimum on interactive controls.

### 9.1 Activation

**US-001** As a new user without a budget, I want to see a clear prompt on Home so that I understand what to do next.

- AC: Banner visible when `budget == null`.
- AC: Banner hidden once budget exists for current month.
- AC: Tapping "Set up now" navigates to Create Budget.

**US-002** As a user creating a budget, I want suggested amount chips so that I can set a total quickly.

- AC: Chips populate total amount field on tap.
- AC: Manual entry still allowed.

**US-003** As a user allocating categories, I want to see how much budget remains unassigned so that I distribute the full $6,000.

- AC: "Amount left" updates in real time.
- AC: Primary CTA disabled when amount left ≠ 0.
- AC: Error copy if user attempts save with remainder.

### 9.2 Custom categories

**US-004** As a user, I want to add a custom category with icon and color so that my budget reflects my lifestyle.

- AC: Modal collects name (required), icon (default bag), color (default first swatch).
- AC: Suggestion chips fill name on tap.
- AC: New category appears in allocation list with editable amount default.

### 9.3 Monitoring spend

**US-005** As a user with a budget, I want a spending insight on Home so that I know if I am on track without drilling in.

- AC: Shows `$X left`, progress bar, `$Y of $Z spent`.
- AC: Tapping card opens Spending allocation screen.

**US-006** As a user, I want to switch months on the insight screen so that I can review past periods.

- AC: Month dropdown shows calendar months with data.
- AC: Chart and category list reflect selected month.

**US-007** As a user, I want to see when a category exceeds its limit so that I can correct course.

- AC: List row shows spent/limit with visual overflow when spent > limit.
- AC: Info icon appears on over-budget row (per design).
- AC: Category detail shows "Limit exceeded" badge and overage amount.

### 9.4 Course correction

**US-008** As a user, I want to raise a category limit from the detail screen so that I can adapt my plan.

- AC: Adjust limit shows current limit and editable amount field.
- AC: Mobile (&lt; 768 px): on-screen numeric keypad per Figma; desktop: standard input with keyboard entry.
- AC: Save requires valid positive amount.
- AC: User chooses immediate vs next-month application.

**US-009** As a user, I want to rename or delete a category so that I can keep my budget tidy.

- AC: Manage sheet offers Rename, Adjust limit, Delete.
- AC: Delete shows confirmation dialog (not in design — required for safety).

---

## 10. Functional requirements (detailed)

### 10.1 Data model (logical)

```
User
  └── Account(s) → balance, currency
  └── Budget (per month)
        ├── total_amount
        ├── billing_month
        └── CategoryBudget[]
              ├── category_id
              ├── limit_amount
              ├── spent_amount (computed)
              └── pending_limit_change (optional, effective_date)
  └── Category
        ├── name, icon_key, color_token
        └── system_default | user_created
  └── Transaction
        ├── merchant_name, amount, direction, timestamp
        └── category_id (assigned)
```

### 10.2 Budget lifecycle

| State | Home UI | Transitions |
|-------|---------|-------------|
| `NO_BUDGET` | Activation banner | → `ACTIVE` on successful create |
| `ACTIVE` | Spending insight card | → `ACTIVE` (new month auto-roll or manual) |
| `OVERSPEND_CATEGORY` | Insight + warning icons | User adjusts limit or spending |

**Month rollover (MVP):** Clone previous month budget with same category limits unless user edited; reset spent counters.

### 10.3 Transaction categorization

- **MVP:** Rule-based (merchant string match) + manual recategorize on detail (future).
- **Default category:** General if unmatched.
- Design sample merchants: Fitness first (−$50), Transfer wise (+$50 / −$700 / −$500).

### 10.4 Amount formatting

- Currency: USD, 2 decimal places, thousands separator.
- Negative outflows prefixed with `−` or styled gray; inflows green without sign or with `+` (design uses color only for small inflows).

### 10.5 Accessibility

- Balance hide toggle must be keyboard/screen-reader accessible with `aria-pressed`.
- Overspend status not color-only — includes text ("Limit exceeded").
- Touch targets ≥ 44×44 px for nav and keypad on mobile viewports.
- Desktop: visible focus indicators, logical tab order, modal focus trap, `aria-modal` on dialogs.
- Responsive text scales with user browser font-size preferences (use relative units).

---

## 11. Non-functional requirements

| Area | Requirement |
|------|-------------|
| **Platform** | Responsive web app; desktop + mobile browsers; no native app required |
| **Performance** | LCP &lt; 2.5s on mid-tier mobile (4G); home paint &lt; 1.5s on desktop; chart render &lt; 300ms |
| **Responsive** | Functional at 320–1920 px viewport width; no horizontal scroll at any supported width |
| **Browser support** | Latest 2 versions: Chrome, Safari, Firefox, Edge; iOS Safari 16+, Chrome Android |
| **Security** | HTTPS only; balance masking persists per session; secure cookies / token storage |
| **Privacy** | GDPR-ready data export/deletion hooks even if UI ships later |
| **Availability** | 99.5% API uptime for MVP read paths |
| **Localization** | i18n-ready strings; MVP English-only |
| **Analytics** | Instrument budget funnel, insight CTR, overspend views, limit adjustments; segment by viewport bucket (mobile / desktop) |
| **SEO** | Basic meta tags and crawlable landing/login shell (authenticated app may be noindex) |

---

## 12. Technical assumptions

- **Frontend:** Modern web stack (e.g. React/Next.js, Vue/Nuxt, or equivalent) with **responsive CSS** (Tailwind, CSS modules, or design-system tokens) — single codebase for all viewports.
- **Not in scope:** React Native, Flutter, Swift, Kotlin native clients for MVP.
- **Layout:** CSS Grid/Flexbox + breakpoint hooks; container queries optional for card components.
- **Routing:** Client-side or SSR routing with shareable URLs per major view (home, budget create, spending insight, category detail).
- **Backend:** REST or GraphQL API for budgets, categories, transactions; computed `spent_amount` from transaction stream.
- **State management:** Optimistic UI for limit changes with rollback on failure.
- **Design handoff:** Figma mobile frames = mobile viewport reference; design/engineering to define desktop layout variants during sprint 0 (sidebar, two-column insight).
- **Hosting:** Static/SSR web deploy (Vercel, Netlify, CloudFront, etc.) with API on separate service.
- **Optional PWA:** Service worker and `manifest.json` as non-blocking enhancement for add-to-home-screen on mobile.

---

## 13. Phased roadmap

### Phase 0 — MVP (responsive web)
Responsive web app: home + budget creation + spending insight + category management + basic transaction list. Desktop and mobile browsers. **No native apps.**

### Phase 1 — Money movement
Deposit / Transfer flows, linked accounts (Plaid / open banking), real-time balance sync.

### Phase 2 — Growth tabs
Cards (virtual/physical), Rewards (partner offers), Profile (settings, security, notifications).

### Phase 3 — Intelligence
Forecasting ("You'll exceed Transportation by $X on current pace"), smart nudges, subscription detection.

### Phase 4 — Monetization
Premium tiers (multi-budget, export, joint accounts), interchange/rewards revenue from Cards tab.

### Phase 5 — Native clients (post-PMF)
Evaluate native iOS/Android or Capacitor/Tauri wrapper **only after** web retention and budget-creation metrics justify the investment.

---

## 14. Risks & mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Figma is mobile-only — desktop UX undefined | Inconsistent desktop experience | Sprint 0 desktop wireframes; §5.3 adaptation rules; US-000b acceptance criteria |
| Users expect App Store app in fintech | Lower mobile engagement vs native | Clear "works in browser" messaging; optional PWA install prompt; Phase 5 gate for native |
| No bank linking in design — balance is static demo data | Users distrust app | Phase 1 prioritization; MVP uses manual/synced mock for demos |
| Category delete with existing transactions | Data integrity | Soft-delete + force recategorize modal |
| "Apply next month" complexity | Engineering cost | Ship immediate-only in MVP if needed; add cycle sheet in fast follow |
| Cards/Rewards nav visible but empty | User confusion | Placeholder education screens or disable tabs until Phase 2 |
| Over-budget UX feels punitive | Churn | Copy tone: neutral ("$250 over") not alarmist; lead with adjust action |
| Responsive chart complexity | Layout bugs on resize | Fixed aspect ratio container; test at 375 / 768 / 1280 px in CI visual checks |

---

## 15. Open questions

1. **Budget period:** Calendar month only, or user-defined billing cycle start day?
2. **Unallocated remainder:** Can users save budget with amount left > 0, or hard block (design implies block)?
3. **Category delete:** Reassign transactions to General, block delete, or cascade delete?
4. **Transfer wise positive amounts:** Treat as income category or transfer between accounts (affects spent math)?
5. **Multi-account balance:** Is $18,987.67 aggregated or single primary account?
6. **More quick action:** What menu items — pay bills, request, statements?
7. **Rewards/Cards:** Partner roadmap or nav placeholders for visual completeness only?
8. **Notification types:** Overspend alerts, deposit received, budget reminders?
9. **Desktop navigation:** Sidebar vs top nav — design decision needed in sprint 0.
10. **PWA in MVP or fast-follow:** Does add-to-home-screen matter for launch cohort?

---

## 16. Appendix

### A. Figma node reference (for engineering)

| Screen | Node ID |
|--------|---------|
| Cover artboard | `2:1220` |
| Home (pre-budget) | `2:1221` |
| Create Budget | `2:1315` |
| Create Budget + category modal | `2:1439` |
| Budget success | `2:1387` |
| Home (post-budget) | `2:1563` |
| Spending allocation | `2:1647` |
| Spending insight (ring chart) | `2:1752` |
| Category detail | `2:1847` |
| Adjust limit | `2:2763` |
| Billing cycle sheet | `2:2819` |
| Manage category sheet | `2:2956` |

### B. Competitive positioning (PO lens)

| Capability | Fintrack (design) | MoneyPro | Klarna |
|------------|-------------------|----------|--------|
| Envelope budgeting | ✓ Core | ✓ Core | Partial (spend tab) |
| Balance + budgeting unified | ✓ Home | ✓ | ✓ (balance separate) |
| Category customization | ✓ | ✓ | Limited |
| Overspend handling | ✓ Explicit | ✓ | Soft limits |
| Cards / rewards | Nav only | Some | ✓ Core |
| Payment processing | — | — | ✓ (Stripe-adjacent) |

**Differentiation wedge:** Faster activation UX (single home CTA, chip-based setup) + calmer overspend management (adjust limit + billing cycle choice) vs spreadsheet-grade complexity.

### C. MVP definition of done

- [ ] All P0 epics (A–G) implemented per acceptance criteria
- [ ] Responsive web app verified at 375 px, 768 px, and 1280 px viewports
- [ ] Mobile: bottom tab nav; desktop: sidebar or top nav — same four destinations
- [ ] All flows pass on mobile Safari and desktop Chrome
- [ ] Budget sum validation enforced client- and server-side
- [ ] Spending insight math verified against fixture transactions
- [ ] Overspend states match design copy and visuals
- [ ] Non-Home tabs show intentional placeholder
- [ ] Analytics events for funnel steps 1–6 (with mobile/desktop dimension)
- [ ] Accessibility audit on home, budget create, adjust limit (keyboard + screen reader)
- [ ] Empty/error/loading states defined (design gap — use skeletons + retry)
- [ ] **Not required for MVP:** App Store / Play Store binaries, native push notifications

---

*This PRD was generated from Figma MCP metadata and design context analysis. Update after design reviews, user research, and engineering estimation.*
