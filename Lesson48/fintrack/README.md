# Fintrack

Responsive web MVP for envelope-style budgeting and spending insights.

Product requirements: [../docs/prd.md](../docs/prd.md)

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Prisma + SQLite (local dev)
- Jest + Playwright

## Quick start

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:4010](http://localhost:4010).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server on port 4010 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Jest unit tests |
| `npm run test:e2e` | Playwright (mobile + desktop viewports) |
| `npm run db:push` | Apply Prisma schema to SQLite |
| `npm run db:seed` | Seed demo user Parzival + sample data |
| `npm run db:studio` | Prisma Studio |

## Routes

| Path | Epic |
| --- | --- |
| `/` | Home dashboard |
| `/budget/create` | Create budget |
| `/budget/success` | Budget confirmation |
| `/insights` | Spending allocation |
| `/categories/[id]` | Category detail |
| `/categories/[id]/adjust-limit` | Adjust limit |
| `/transactions` | Transaction list |
| `/cards`, `/rewards`, `/profile` | MVP placeholders |

## Responsive layout

- **Mobile (`< 768px`)**: bottom tab navigation, touch-first spacing
- **Desktop (`>= 1024px`)**: persistent sidebar navigation
- Modals use bottom sheets on mobile and centered dialogs on desktop (`ResponsiveOverlay`)

## API

- `GET/POST /api/budgets`
- `PATCH /api/budgets/[id]`
- `GET/POST /api/categories`
- `PATCH/DELETE /api/categories/[id]`
- `GET /api/transactions`

## Out of scope (MVP)

- Native iOS/Android apps
- Auth0 / bank linking
- Cards, Rewards, Profile product flows
