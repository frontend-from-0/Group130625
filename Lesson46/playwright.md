# Integration & E2E testing with Playwright (Next.js)


```
        /\
       /  \      E2E              ← Playwright (today)
      /----\
     /      \    Integration      ← Playwright (today) / Jest + RTL
    /--------\
   /          \  Unit + snapshot  ← Jest + RTL (React Testing Library)
  /------------\
```

- **Unit** — one function or component, no I/O. Fast (ms), many.
- **Integration** — multiple modules wired together: a page + its server action, a route handler + the DB, a form + its validation. Slower, fewer.
- **End-to-end (E2E)** — a real browser driving the running app like a real user. Slowest, fewest, highest confidence.

In modern Next.js the line between integration and E2E blurs because server components, server actions, and route handlers all execute inside one running app. Playwright is good at **both**: it boots a real browser, hits the real dev server, and lets us stub only the parts we don't want to talk to (Stripe, Auth0, Vercel Blob).

---

## Why Playwright (vs Cypress, Selenium)

- Multi-browser out of the box: Chromium, Firefox, WebKit.
- Built-in **auto-waiting** — no `sleep(500)`, no flaky tests.
- Parallel execution by default.
- First-class TypeScript.
- Killer tooling: **UI mode**, **trace viewer**, **codegen**, **Inspector**.
- Officially recommended by Next.js for E2E. See [Next.js + Playwright guide](https://nextjs.org/docs/app/guides/testing/playwright).

---

## Setup in this project

Run from `Lesson46/ecom-130625/`:

```bash
npm init playwright@latest
```

Pick:

- TypeScript (yes)
- `e2e` as the tests folder
- GitHub Actions workflow (yes, optional)
- Install browsers (yes)

That creates:

```
e2e/                       ← your test files live here
playwright.config.ts       ← config: browsers, baseURL, webServer
.github/workflows/playwright.yml
```

Open `playwright.config.ts` and set the **webServer** + **baseURL** so Playwright boots the Next.js dev server on the right port for you. This app runs on **port 4005** (see `package.json`):

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:4005',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4005',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

Docs: [Test configuration](https://playwright.dev/docs/test-configuration), [Web server](https://playwright.dev/docs/test-webserver).

If browsers were not installed at init time:

```bash
npx playwright install
```

---

## Commands you will use today

| Command | What it does |
| --- | --- |
| `npx playwright test` | Run all tests (headless). |
| `npx playwright test e2e/home.spec.ts` | Run one file. |
| `npx playwright test --headed` | Watch the browser do the thing. |
| `npx playwright test --ui` | **UI mode** — time-travel debugger. Use this most of the day. |
| `npx playwright test --debug` | Open Playwright Inspector, step through. |
| `npx playwright test --grep "checkout"` | Run only tests whose title matches. |
| `npx playwright codegen http://localhost:4005` | Record clicks → generate test code. |
| `npx playwright show-report` | Open the last HTML report. |
| `npx playwright show-trace trace.zip` | Open a saved trace. |

Add a script to `package.json` after `npm init playwright@latest` so it feels at home next to `npm test`:

```json
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```

These scripts are not in the starter repo — add them during setup.

---

## Anatomy of a Playwright test

```ts
import { test, expect } from '@playwright/test';

test('homepage shows featured products', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /featured electronics/i })).toBeVisible();
});
```

Same `describe` / `it` / `expect` muscle memory as Jest, but with extra Playwright-specific superpowers:

- `page` is a **fixture** — Playwright injects a fresh browser tab for every test.
- `expect(locator).toBe...()` assertions are **web-first**: Playwright retries them until they pass or time out. No manual waiting.

Docs: [Writing tests](https://playwright.dev/docs/writing-tests), [Test fixtures](https://playwright.dev/docs/test-fixtures).

---

## Locators (how you find things on the page)

Always prefer **user-facing** locators in this order:

1. `page.getByRole('button', { name: 'Buy now' })` — accessibility role.
2. `page.getByLabel('Product title')` — for form fields.
3. `page.getByPlaceholder('e.g. Orbit Wireless Earbuds')`.
4. `page.getByText('403')`.
5. `page.getByTestId('go-home-link')` — last resort; we already have one on the forbidden page (`data-testid="go-home-link"`).

Avoid CSS / XPath selectors unless nothing else works. They break when designers tweak Tailwind classes.

Docs: [Locators](https://playwright.dev/docs/locators).

---

## Assertions you will actually use

```ts
await expect(page).toHaveURL('/forbidden');
await expect(page).toHaveTitle(/VoltHaus/);

await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toHaveText('403');
await expect(locator).toContainText('Featured');
await expect(locator).toHaveAttribute('href', '/');
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();

await expect(page.locator('article')).toHaveCount(8);
```

Docs: [Assertions](https://playwright.dev/docs/test-assertions).

---

## Real flows we will test in this app

### 1. Public homepage (pure E2E smoke test)

```ts
import { test, expect } from '@playwright/test';

test('homepage lists all 8 featured products', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /featured electronics/i }),
  ).toBeVisible();

  await expect(page.locator('article')).toHaveCount(8);

  await expect(
    page.getByRole('heading', { name: 'Aether ANC Headphones' }),
  ).toBeVisible();
});
```

### 2. Forbidden page (deterministic E2E)

Compare this with the snapshot test from lesson 1 — same intent, very different confidence.

```ts
test('forbidden page links back home', async ({ page }) => {
  await page.goto('/forbidden');

  await expect(page.getByText('403')).toBeVisible();
  await expect(page.getByTestId('go-home-link')).toHaveAttribute('href', '/');
});
```

### 3. Admin products — lesson exercise (you write these)

During the lesson you will add Playwright tests for the admin product flow in `e2e/admin-products.spec.ts`. Use the patterns from the examples above — do not copy a finished solution from this doc.

**Test A — validation:** open `/admin/products/new`, submit the empty form, and assert the Zod error messages appear in the UI (`Product title is required.`, `Upload at least one image.`).

**Test B — create + list:** fill in title, price, and an image file, save, land on `/admin/products`, and assert the new product row is visible (title, price, thumbnail).

Hints:

- The form is behind `requireAdmin()`. Use `storageState` with a saved admin session (see section 5 and [Authentication](https://playwright.dev/docs/auth)).
- Prefer `getByLabel('Product title')`, `getByLabel('Price')`, `getByLabel('Image files')`, and `getByRole('button', { name: /save product/i })`.
- Use `setInputFiles()` for the image upload. Put a small fixture under `e2e/fixtures/`.
- Clean up test products from MongoDB in `afterEach` / `finally` so reruns stay reliable.

### 4. Checkout — network interception (no real Stripe call)

We never want CI to spend money. Intercept the POST and assert the request payload.

```ts
test('Buy now posts the right price id to /api/checkout', async ({ page }) => {
  await page.route('**/api/checkout/', async (route) => {
    const request = route.request();
    const post = request.postData() ?? '';
    expect(post).toContain('price_1TLopAQitHtctVUTDOFoUqz7');
    await route.fulfill({ status: 200, body: 'ok' });
  });

  await page.goto('/');
  await page
    .locator('article')
    .first()
    .getByRole('button', { name: /buy now/i })
    .click({ force: true });
});
```

Docs: [Network mocking](https://playwright.dev/docs/network), [`page.route`](https://playwright.dev/docs/api/class-page#page-route).

### 5. Auth-gated route (concept only)

Visiting `/admin` while logged out gets you bounced. Real Auth0 login is painful inside E2E — Playwright's recommended pattern is **storageState**: log in once via a setup project, save cookies, and reuse them.

```ts
test('admin route is gated', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).not.toHaveURL('/admin');
});
```

For the full storageState pattern read: [Authentication](https://playwright.dev/docs/auth).

---

## Stubbing the world (so CI is reliable)

Three things in this repo touch the outside world. Stub them all in tests:

- **Stripe** — intercept `**/api/checkout/**` with `page.route()`.
- **Auth0** — use `storageState` with a pre-baked session, or stub the session route.
- **Vercel Blob** — intercept the upload, return a fake URL.

Rule of thumb: **never let a test reach the public internet**.

---

## Debugging tools

- **UI mode** (`--ui`) — pick a test, step through, see the DOM at every point. Start here.
- **Inspector** (`--debug`) — pauses on each step, you control the next action.
- **Trace viewer** — every retried/failed test saves a `trace.zip`. Open it with `npx playwright show-trace trace.zip` — full timeline, screenshots, network, console.
- **HTML report** — `npx playwright show-report` after a run.
- **Codegen** (`codegen <url>`) — click around the app, Playwright writes the locator code for you. Great for getting unstuck.

Docs: [UI mode](https://playwright.dev/docs/test-ui-mode), [Trace viewer](https://playwright.dev/docs/trace-viewer), [Codegen](https://playwright.dev/docs/codegen).

---

## Best practices (read [the official one](https://playwright.dev/docs/best-practices))

- One scenario per test. If a test fails you should know **which user flow** broke.
- Prefer role-based locators. Treat `data-testid` as a fallback.
- Never use `page.waitForTimeout(ms)`. Wait for **state**, not time.
- Keep tests independent — no shared cookies / localStorage between them unless you opt in.
- Reset DB state between tests when you write integration tests that hit Prisma.
- Use **storageState** for login. Don't log in from the UI on every test.
- Run on at least Chromium locally + add Firefox/WebKit in CI before release.

---

## Useful links (bookmark these)

- [Getting started](https://playwright.dev/docs/intro)
- [Next.js + Playwright official guide](https://nextjs.org/docs/app/guides/testing/playwright)
- [Writing tests](https://playwright.dev/docs/writing-tests)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Auto-waiting](https://playwright.dev/docs/actionability)
- [Network mocking](https://playwright.dev/docs/network)
- [Authentication / storageState](https://playwright.dev/docs/auth)
- [Test configuration](https://playwright.dev/docs/test-configuration)
- [Web server](https://playwright.dev/docs/test-webserver)
- [UI mode](https://playwright.dev/docs/test-ui-mode)
- [Trace viewer](https://playwright.dev/docs/trace-viewer)
- [Codegen](https://playwright.dev/docs/codegen)
- [Best practices](https://playwright.dev/docs/best-practices)
- [CI guide](https://playwright.dev/docs/ci)


