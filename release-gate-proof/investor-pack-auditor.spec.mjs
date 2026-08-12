import { test, expect } from '@playwright/test';

test('shows six traceable investor-pack findings without horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('/investor-pack-auditor.html');

  await expect(page.getByRole('heading', { name: 'Six inconsistencies found before the investor meeting' })).toBeVisible();
  await expect(page.locator('.finding')).toHaveCount(6);
  await expect(page.locator('.locations').filter({ hasText: 'Summary!B5' })).toBeVisible();
  await expect(page.getByText('(120,000 / 100,000) - 1 = 20.0%.', { exact: true })).toBeVisible();
  await expect(page.locator('img')).toHaveCount(3);

  const imageState = await page.locator('img').evaluateAll((images) =>
    images.map((image) => ({ complete: image.complete, width: image.naturalWidth })),
  );
  expect(imageState.every((image) => image.complete && image.width > 0)).toBe(true);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasOverflow).toBe(false);

  await page.screenshot({
    path: `output/playwright/investor-pack-auditor-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
