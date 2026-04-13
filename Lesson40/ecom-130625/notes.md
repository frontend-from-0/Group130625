## Initialize Prisma (project setup)

```bash
npx prisma init
```

## Sync schema changes with MongoDB

```bash
npx prisma db push
```

Read more: [Prisma MongoDB schema evolution](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb#8-evolve-your-schema)


## Prisma CRUD operations
Read more: [Prisa CRUD operations](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

## Why use Prisma (vs MongoDB directly in Next.js)?

- **Type-safe queries:** Prisma gives autocompletion and compile-time checks, so you catch many mistakes before runtime.
- **Single data layer:** You write DB logic through one client/API instead of mixing raw Mongo queries across routes and server actions.
- **Cleaner schema management:** Your Prisma schema becomes a clear source of truth for models, relations, and field changes.
- **Better beginner DX:** Easier to read/write than raw driver code, especially for CRUD and filtering.
- **Safer refactors:** Renaming fields/models is less risky because TypeScript + Prisma types highlight what must be updated.
- **Built-in tooling:** Prisma Studio, generated client, and docs speed up local debugging and development.

When direct MongoDB can still make sense:
- If you need very Mongo-specific features (complex aggregation pipelines, low-level driver options), raw MongoDB may be simpler for that specific query.
- Many teams still use Prisma for most queries and use the Mongo driver only for advanced edge cases.
