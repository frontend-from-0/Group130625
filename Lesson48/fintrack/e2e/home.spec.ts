import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("shows greeting and budget CTA for demo user", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Good (Morning|Afternoon|Evening), Parzival/i }),
    ).toBeVisible();
    await expect(page.getByText("Set a financial budget")).toBeVisible();
    await expect(page.getByRole("link", { name: "Set up now" })).toBeVisible();
  });

  test("primary navigation resolves without 404", async ({ page }) => {
    for (const path of ["/", "/cards", "/rewards", "/profile"]) {
      await page.goto(path);
      await expect(
        page.getByRole("navigation", { name: "Primary" }),
      ).toBeVisible();
    }
  });
});
