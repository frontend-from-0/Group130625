# Live Quiz App

A micro-learning web app for learning anything—especially software development. Enter a topic, choose a session length (5, 10, or 15 questions), and work through a bounded study session with progress tracking and a results summary. Powered by the [Vercel AI SDK](https://ai-sdk.dev) structured outputs (`streamText` + `Output.object` and `useObject`).

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and add your OpenAI API key:

   ```bash
   cp .env.example .env.local
   ```

   Set `OPENAI_API_KEY` in `.env.local`.

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Usage

- Enter a topic (e.g. `React useMemo`, `HTTP status codes`, `TypeScript generics`) and choose **5**, **10**, or **15** questions.
- Click **Start study session**. While the session streams in, you’ll see an outline of what will be covered.
- If the topic is too vague, the app suggests specific topics to pick from.
- Answer each question to reveal correct/incorrect styling and explanations.
- Click **Next question** to continue (or **View results** on the last question).
- On the results screen, review your score, strengths, and concepts to revisit. Use **Try again** for the same topic or **New topic** to start over.

## Deploy

Deploy to [Vercel](https://vercel.com) and set `OPENAI_API_KEY` in the project environment variables.

## API protection (no auth)

`/api/quiz` is called from the browser, so you **cannot** hide a shared secret in the client—anyone can copy it from DevTools.

What this project does:

- **Same-origin proxy** ([`src/proxy.ts`](src/proxy.ts)): rejects requests without an `Origin` or `Referer` that matches your site’s host. Stops other websites and casual `curl` abuse; it is **not** strong security (Origin can be spoofed).

What you should add before heavy traffic:

1. **Rate limiting** (recommended): e.g. [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) in the proxy or the route—limits cost per IP.
2. **OpenAI usage limits**: set monthly spend caps in the [OpenAI dashboard](https://platform.openai.com/settings/organization/limits).
3. **Real auth** (if you add accounts later): session cookie or Clerk/Auth.js, and only call the model for signed-in users.

Optional hardening: move generation behind a **Server Action** so there is no public REST path (still abusable through your UI, but harder to discover than `/api/quiz`).

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- AI SDK 6 (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`)
- Zod 4
