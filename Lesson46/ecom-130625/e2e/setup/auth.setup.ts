import fs from "node:fs";
import path from "node:path";
import { expect, test as setup, type Page } from "@playwright/test";

const authDir = path.join(__dirname, "..", ".auth");
const authFile = path.join(authDir, "admin.json");

async function completeAuth0Login(page: Page): Promise<void> {
  const email = process.env.E2E_ADMIN_EMAIL;
  const password = process.env.E2E_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      [
        "Missing E2E admin credentials.",
        "Add to .env.local:",
        "  E2E_ADMIN_EMAIL=admin@test.com",
        "  E2E_ADMIN_PASSWORD=your-password",
      ].join("\n"),
    );
  }

  const acceptButton = page.getByRole("button", { name: "Accept" });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
    await page.waitForURL(/localhost:4005/, { timeout: 30_000 });
    return;
  }

  const emailInput = page.getByRole("textbox", { name: "Email address" });
  if (await emailInput.isVisible()) {
    await emailInput.fill(email);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForURL(/localhost:4005/, { timeout: 30_000 });
  }
}

setup("authenticate as admin", async ({ browser }) => {
  fs.mkdirSync(authDir, { recursive: true });

  const context = await browser.newContext(
    fs.existsSync(authFile) ? { storageState: authFile } : undefined,
  );
  const page = await context.newPage();

  await page.goto("/admin/products");

  if (page.url().includes("auth0.com")) {
    await completeAuth0Login(page);
  }

  if (!page.url().includes("/admin/products")) {
    await page.goto("/admin/products");
  }

  if (page.url().includes("auth0.com")) {
    await completeAuth0Login(page);
    await page.goto("/admin/products");
  }

  if (page.url().includes("/forbidden")) {
    throw new Error(
      "E2E admin user lacks the admin role. Assign the admin role in Auth0.",
    );
  }

  if (page.url().includes("/auth/login") || page.url().includes("auth0.com")) {
    throw new Error(
      [
        "Admin session is missing or expired.",
        "Refresh it with:",
        "  npx playwright codegen http://localhost:4005/admin/products --save-storage=e2e/.auth/admin.json",
      ].join("\n"),
    );
  }

  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

  await context.storageState({ path: authFile });
  await context.close();
});
