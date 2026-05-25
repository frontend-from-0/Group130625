# Environment variables — `ecom-130625`

Copy the template at the bottom into a **`.env.local`** file in this folder (Next.js loads it automatically).  
Do **not** commit `.env` or `.env.local` — they are listed in `.gitignore`.

The dev server runs on **port 4005** (`npm run dev`).

---

## Quick reference

| Variable | Required | Used for |
| --- | --- | --- |
| `AUTH0_DOMAIN` | Yes | Login / logout / session |
| `AUTH0_CLIENT_ID` | Yes | Auth0 application |
| `AUTH0_CLIENT_SECRET` | Yes | Auth0 application |
| `AUTH0_SECRET` | Yes | Encrypts Auth0 session cookies |
| `APP_BASE_URL` | Yes (local) | Auth0 callback URLs — use `http://localhost:4005` |
| `DATABASE_URL` | Yes | Prisma → MongoDB Atlas |
| `STRIPE_SECRET_KEY` | Yes | Checkout API (`/api/checkout`) |
| `BLOB_READ_WRITE_TOKEN` | For admin uploads | Product image uploads (Vercel Blob) |
| `MONGO_URI` | No | Not used by current code; kept for optional direct MongoDB driver usage |
| `STRIPE_PUBLISHABLE_KEY` | No | Not used by current code (checkout is server-side) |
| `STRIPE_WEBHOOK_SECRET` | No | Not used by current code (no webhook route yet) |

---

## Auth0

Required for login, profile, and admin access (`/admin/*` is protected by `requireAdmin()`).

| Variable | Description | Where to find it |
| --- | --- | --- |
| `AUTH0_DOMAIN` | Your Auth0 tenant domain **without** `https://` | Auth0 Dashboard → Applications → Settings → Domain |
| `AUTH0_CLIENT_ID` | Application Client ID | Auth0 Dashboard → Applications → Settings |
| `AUTH0_CLIENT_SECRET` | Application Client Secret | Auth0 Dashboard → Applications → Settings |
| `AUTH0_SECRET` | Random secret for cookie encryption (min 32 chars) | Generate locally (see below) |
| `APP_BASE_URL` | Public URL of this app | `http://localhost:4005` in local dev |

Generate `AUTH0_SECRET`:

```bash
openssl rand -hex 32
```

**Auth0 Dashboard URLs** (port 4005):

- Allowed Callback URLs: `http://localhost:4005/auth/callback`
- Allowed Logout URLs: `http://localhost:4005`
- Allowed Web Origins: `http://localhost:4005`

Roles setup (`user` / `admin`): see [`docs/auth0-roles.md`](docs/auth0-roles.md).

Docs: [@auth0/nextjs-auth0 — environment variables](https://github.com/auth0/nextjs-auth0#configure)

---

## MongoDB + Prisma

Required for admin product list and creating products in the database.

| Variable | Description | Where to find it |
| --- | --- | --- |
| `DATABASE_URL` | MongoDB connection string for Prisma | MongoDB Atlas → Connect → Drivers |

Example format:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

After setting `DATABASE_URL`, sync the schema:

```bash
npx prisma generate
npx prisma db push
```

Docs: [`docs/prisma.md`](docs/prisma.md)

---

## Stripe

Required for the **Buy now** button on the homepage (`POST /api/checkout` → Stripe Checkout redirect).

| Variable | Description | Where to find it |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Server-side Stripe API key | Stripe Dashboard → Developers → API keys → Secret key |

Use **test mode** keys (`sk_test_...`) for local development.

The app reads this in `lib/stripe.ts`. There is no client-side Stripe.js integration yet, so `STRIPE_PUBLISHABLE_KEY` is not required.

Docs: [Stripe API keys](https://docs.stripe.com/keys)

---

## Vercel Blob (product image uploads)

Required only when using **Admin → Add new product** with image files.

| Variable | Description | Where to find it |
| --- | --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Token for `@vercel/blob` uploads | Vercel Dashboard → Storage → Blob → token |

Used in `app/admin/products/new/actions.ts` via `put()` from `@vercel/blob`.

Docs: [Vercel Blob — quickstart](https://vercel.com/docs/storage/vercel-blob/quickstart)

---

## Optional (not used by current code)

These appear in README or related lessons but are **not referenced** in the current codebase. You can skip them unless you extend the app.

| Variable | Notes |
| --- | --- |
| `MONGO_URI` | Alternative MongoDB URI if using the native `mongodb` driver directly |
| `STRIPE_PUBLISHABLE_KEY` | Would be needed for client-side Stripe Elements / Payment Element |
| `STRIPE_WEBHOOK_SECRET` | Would be needed if you add a Stripe webhook route handler |

---

## Copy-paste template

Create `.env.local` with:

```env
# Auth0 (required)
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_SECRET=generate_with_openssl_rand_hex_32
APP_BASE_URL=http://localhost:4005

# MongoDB + Prisma (required)
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# Stripe (required for checkout)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Vercel Blob (required for admin product image uploads)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token
```

---

## Minimum setup by feature

| What you want to test | Variables you need |
| --- | --- |
| Homepage only (browse products) | None — static product cards work without env |
| Login / profile | Auth0 block |
| Admin products list / create | Auth0 + `DATABASE_URL` |
| Admin create with images | Auth0 + `DATABASE_URL` + `BLOB_READ_WRITE_TOKEN` |
| Buy now → Stripe Checkout | `STRIPE_SECRET_KEY` (+ valid Stripe price id in code) |
| Playwright E2E (most flows) | Auth0 + `DATABASE_URL`; stub Stripe in tests with `page.route()` |
