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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and set `LESSON_DEMO_MESSAGE`. The [`/env-demo`](src/app/env-demo/page.tsx) route reads it on the server and is configured for **dynamic** rendering so values can change per deploy without relying on build-time inlining alone.

## API route (“serverless-style” handler)

[`src/app/api/ping/route.ts`](src/app/api/ping/route.ts) exposes **`GET` and `POST`** at **`/api/ping`**. Open it in the browser for JSON, or watch the dev terminal while running:

```bash
curl -s http://localhost:3000/api/ping
curl -s -X POST http://localhost:3000/api/ping -H 'Content-Type: application/json' -d '{"message":"hello from curl"}'
```

On platforms like Vercel, `console.log` from route handlers shows up in **Runtime Logs**—similar to a small cloud function.

## CI (GitHub Actions)

On GitHub, pushes and pull requests to `main` / `master` run [`.github/workflows/ci.yml`](.github/workflows/ci.yml): **Prettier** (`format:check`), **ESLint**, **TypeScript** (`typecheck`), then **`next build`**. Instructor notes (including monorepo setup): [`../nextjs-notes.md`](../nextjs-notes.md).

Locally match CI: `npm run format:check && npm run lint && npm run typecheck && npm run build`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
