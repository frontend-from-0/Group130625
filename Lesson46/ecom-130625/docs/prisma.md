# Prisma + MongoDB + Next.js (Beginner Guide)

## Video summary

Key points:
- Prisma gives type-safe database access on top of MongoDB, so queries are safer and easier to refactor.
- The stack (for this project): Next.js (App Router) + Prisma ORM + MongoDB Atlas + TypeScript.
- Dev flow is: define schema -> generate client -> push schema -> use Prisma in server actions/components.
- A Prisma Client singleton is recommended in Next.js to avoid multiple DB connections in development.
- Prisma Accelerate is introduced for serverless connection pooling + edge caching (TTL/SWR) and better cold starts.

## Prerequisites

- Node.js `20+`
- A MongoDB Atlas project/cluster + connection string
- Next.js project (or create one)

## 1) Install Prisma in your Next.js project

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

Why:
- `prisma` (dev dependency) = CLI/tools.
- `@prisma/client` = runtime client used in your app.
- `prisma init` creates `prisma/schema.prisma` and env setup.

## 2) Configure MongoDB in Prisma schema

Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

Comment:
- `provider = "mongodb"` tells Prisma to generate Mongo-compatible queries/types.

## 3) Add your MongoDB URL to env

In `.env`:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"
```

Comments:
- Replace `<db-name>` with the database you want Prisma to use.
- For special characters in password, URL-encode them.
- Keep `.env` out of git.

## 4) Add your first model(s)

Example `prisma/schema.prisma` models for MongoDB:

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Comment:
- `@map("_id")` + `@db.ObjectId` maps Prisma `id` to MongoDB `_id`.

## 5) Sync schema + generate client

```bash
npx prisma db push
```

What this does:
- Creates/updates MongoDB collections + indexes.
- Generates Prisma Client from your schema.

Useful optional command:

```bash
npx prisma generate
```

## 6) Create a Prisma singleton for Next.js

Create `lib/prisma.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

Why:
- Prevents creating too many Prisma clients during hot reload in development.

## 7) Use Prisma in server-side code (App Router)

Example: `app/actions.ts`

```ts
"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(email: string, name?: string) {
  return prisma.user.create({
    data: { email, name },
  });
}
```

Comment:
- Keep DB code on the server (`server actions`, route handlers, or server components).

## 8) Day-to-day development workflow

Use this loop:
1. Update `prisma/schema.prisma` model(s).
2. Run `npx prisma db push`.
3. Use generated Prisma Client in server code.
4. Test in app.
5. Inspect data quickly with Prisma Studio.

Prisma Studio:

```bash
npx prisma studio
```

## 9) Common commands cheat sheet

```bash
# initialize prisma
npx prisma init

# apply schema to mongodb and generate client
npx prisma db push

# regenerate client only
npx prisma generate

# open data browser
npx prisma studio
```
