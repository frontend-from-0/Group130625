import { expect, test } from "@playwright/test";

test.describe("admin access when logged out", () => {
  test("admin dashboard is gated", async ({ page }) => {
    await page.goto("/admin");

    await expect(page).not.toHaveURL("/admin");
  });

  test("products list is gated", async ({ page }) => {
    await page.goto("/admin/products");

    await expect(page).not.toHaveURL("/admin/products");
  });

  test("new product form is gated", async ({ page }) => {
    await page.goto("/admin/products/new");

    await expect(page).not.toHaveURL("/admin/products/new");
  });
});
