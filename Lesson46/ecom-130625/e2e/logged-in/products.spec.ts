import { prisma } from '@/lib/prisma';
import { test, expect } from '@playwright/test';
import path from 'node:path';

const testImage = path.join(__dirname, '../fixtures/laptop2.avif');

test('test', async ({ page }) => {
  // await page.goto('https://dev-jm5m0z3xkqxztipx.us.auth0.com/u/login?state=hKFo2SBUWUFEVjg2cFhGR3ZSY2hMc2dMX1FsU2hHSmh1Z254MKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGZMUFAwY2ZSTXN0c0xzaVZnM1ZfX0U3cGx0aUI1alpzo2NpZNkgdnBBa2x1SnVkdUNxdUJRekNZSU8zRTBqaGg4QWthenI');
  // await page.getByRole('textbox', { name: 'Email address' }).click();
  // await page.getByRole('textbox', { name: 'Email address' }).fill('admin@test.com');
  // await page.getByRole('textbox', { name: 'Password' }).click();
  // await page.getByRole('textbox', { name: 'Password' }).fill('P5TyvXBp#MUHTja');
  // await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.goto('http://localhost:4005/admin/products');
  await page.getByRole('heading', { name: 'Products' }).click();
});

test('Verify that input validation work correctly for new product form', async ({
  page,
}) => {
  await page.goto('http://localhost:4005/admin/products/new');
  await page.getByRole('button', { name: 'Save product' }).click();
  await expect(page.getByText('Product title is required.')).toBeVisible();
  // await page.getByText('Price must be greater than').click();
  // await page.getByText('One or more selected files').click();
  // await page.getByText('Please fix the errors below.').click();
});

test('Verify that product is created correcly', async ({ page }) => {
  const productTitle = 'e2e-test-product';
  const productPrice = '1000';

  try {
    await page.goto('http://localhost:4005/admin/products/new');
    await page
      .getByLabel('Product title')
      .fill(productTitle);
    await page
      .getByLabel('Price')
      .fill(productPrice);
    await page
      .getByLabel('Image files')
      .setInputFiles(testImage);
    await page.getByRole('button', { name: 'Save product' }).click();
    //   If there's no redirection, manually navigate to the products page after creating the product 
    // await page.goto('http://localhost:4005/admin/products');

    await expect(page.getByText(productTitle)).toBeVisible();
    // confirm that product price is also visible and equal to productPrice
  } finally {
    // It's better to create a function for it in service layer (services/products/data.ts file)
    await prisma.product.deleteMany({ where: { title: productTitle } });
  }
});
