import { test, expect } from '@playwright/test';

test('Logged out user should see Login button on the home page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();

  // Anna to fix regex for the URL
  //await expect(page).toHaveURL('https://dev-jm5m0z3xkqxztipx.us.auth0.com/u/login?**');
});

test('Logged out user should see 8 products on the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('products-container')).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(8);
});

