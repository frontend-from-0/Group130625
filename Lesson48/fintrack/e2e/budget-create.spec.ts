import { expect, test } from "@playwright/test";

test("budget create route is reachable from home CTA", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Set up now" }).click();

  await expect(page).toHaveURL(/\/budget\/create$/);
  await expect(
    page.getByRole("heading", { name: "Create Budget" }),
  ).toBeVisible();
});
