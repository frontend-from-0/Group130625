import path from "node:path";
import { expect, test } from "@playwright/test";
import { prisma } from "@/lib/prisma";

const testImage = path.join(__dirname, "../fixtures/test-product.png");

function uniqueProductTitle(): string {
  return `E2E Product ${Date.now()}`;
}

test.describe("admin product management", () => {
  test("shows validation errors when the form is submitted empty", async ({
    page,
  }) => {
    await page.goto("/admin/products/new");

    await page.getByRole("button", { name: /save product/i }).click();

    await expect(page.getByText("Product title is required.")).toBeVisible();
    await expect(page.getByText("Price must be greater than 0.")).toBeVisible();
    await expect(
      page.getByText(/Upload at least one image\.|One or more selected files are empty\./),
    ).toBeVisible();
  });

  test("creates a product and shows it in the admin list", async ({ page }) => {
    const title = uniqueProductTitle();
    const price = "149.99";

    try {
      await page.goto("/admin/products/new");

      await page.getByLabel("Product title").fill(title);
      await page.getByLabel("Price").fill(price);
      await page.getByLabel("Image files").setInputFiles(testImage);
      await page.getByRole("button", { name: /save product/i }).click();

      await expect(page).toHaveURL("/admin/products");
      await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

      const productRow = page.locator("tbody tr", { hasText: title });
      await expect(productRow).toBeVisible();
      await expect(productRow.getByText(title)).toBeVisible();
      await expect(productRow.getByText(/149/)).toBeVisible();
      await expect(productRow.locator("img")).toBeVisible();
    } finally {
      await prisma.product.deleteMany({ where: { title } });
    }
  });
});
