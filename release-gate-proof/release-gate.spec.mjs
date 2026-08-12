import { test, expect } from '@playwright/test';

test('shows the release decision and executable evidence without horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('/release-gate.html');

  await expect(page.getByRole('heading', { name: 'PR Release Gate' })).toBeVisible();
  await expect(page.getByText('4 / 4 policy checks passed')).toBeVisible();
  await expect(page.getByRole('link', { name: /Inspect the policy and tests/ })).toHaveAttribute(
    'href',
    /github\.com\/frank70321-hub\/release-workspace-demo/,
  );

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasOverflow).toBe(false);

  await page.screenshot({
    path: `output/playwright/release-gate-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
