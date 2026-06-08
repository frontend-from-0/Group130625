<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Fintrack agent notes

- MVP is a **responsive web app** only (desktop + mobile browsers). No native apps.
- Design tokens live in `app/globals.css` (`--brand`, `--surface-dark`, etc.).
- Demo user: `parzival@fintrack.demo` — seed with `npm run db:seed`.
- Breakpoints: mobile `< 768px` (bottom nav), desktop `>= 1024px` (sidebar).
- Use named exports, not default exports, for project code.
