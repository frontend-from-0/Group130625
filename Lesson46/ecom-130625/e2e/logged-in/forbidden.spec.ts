import { expect, test } from "@playwright/test";

test("forbidden page links back home", async ({ page }) => {
  await page.goto("/forbidden");

  await expect(page.getByText("403")).toBeVisible();
  await expect(page.getByTestId("go-home-link")).toHaveAttribute("href", "/");
});
