# Environment variables — `fintrack`

Copy the template below into a **`.env.local`** file in this folder (Next.js loads it automatically).  
Do **not** commit `.env` or `.env.local` — they are listed in `.gitignore`.

The dev server runs on **port 4010** (`npm run dev`).

---

## Quick reference

| Variable | Required | Used for |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Prisma → SQLite (`file:./dev.db`) |
| `NEXT_PUBLIC_APP_URL` | Yes (local) | App URL for links/metadata — use `http://localhost:4010` |

---

## Template

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:4010"
```

---

## Database setup

```bash
npm run db:push
npm run db:seed
```

Optional: open Prisma Studio with `npm run db:studio`.
