This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Auth0 authentication

- This repo uses `@auth0/nextjs-auth0` v4 with Next.js `proxy.ts`.
- The dev server runs on **port 4005** (see `package.json`), so your local app URL is `http://localhost:4005`.

### Roles (user/admin)

See [`docs/auth0-roles.md`](docs/auth0-roles.md) for the Auth0 Dashboard setup (RBAC roles + custom claim).

## MongoDB + Prisma setup

- Prisma is pinned to `v6` for MongoDB compatibility in this project.
- Set `DATABASE_URL` in `.env.local` (server-only) to your MongoDB Atlas URI.
- `MONGO_URI` can remain for any existing direct MongoDB driver usage.

### Prisma commands

```bash
npx prisma validate
npx prisma generate
```

### Product image uploads (Vercel Blob)

- Add `BLOB_READ_WRITE_TOKEN` to `.env.local` before creating products with images.
- The admin new product form uploads one or more image files to Blob and stores the Blob URLs in MongoDB (`Product.images`).
- Validation is handled server-side with Zod in the server action.

### Prisma client usage

Use the shared server-side client from `lib/prisma.ts`:

```ts
import { prisma } from "@/lib/prisma";
```

Keep Prisma calls in Server Components, Route Handlers, or Server Actions only.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
