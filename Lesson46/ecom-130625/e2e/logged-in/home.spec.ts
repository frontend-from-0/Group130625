import { expect, test } from "@playwright/test";

test("homepage lists all 8 featured products", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /featured electronics/i }),
  ).toBeVisible();

  await expect(page.locator("article")).toHaveCount(8);

  await expect(
    page.getByRole("heading", { name: "Aether ANC Headphones" }),
  ).toBeVisible();
});
