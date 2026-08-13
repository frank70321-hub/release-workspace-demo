import { test, expect } from '@playwright/test';

test('shows the fictional M&A model QA proof and downloadable workbook', async ({ page }, testInfo) => {
  await page.goto('/mna-model-qa.html');

  await expect(page.getByRole('heading', { name: 'Two decision-critical model errors isolated before lender delivery' })).toBeVisible();
  await expect(page.locator('.finding')).toHaveCount(4);
  await expect(page.getByText('$496,000 observed versus $456,000 expected.', { exact: true })).toBeVisible();

  const download = page.getByRole('link', { name: 'Download the fictional workbook' });
  await expect(download).toHaveAttribute('href', 'assets/mna-model-qa/fictional-mna-model-qa.xlsx');

  const imageState = await page.locator('img').evaluateAll((images) =>
    images.map((image) => ({ complete: image.complete, width: image.naturalWidth })),
  );
  expect(imageState.every((image) => image.complete && image.width > 0)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);

  await page.screenshot({ path: `output/playwright/mna-model-qa-${testInfo.project.name}.png`, fullPage: true });
});
