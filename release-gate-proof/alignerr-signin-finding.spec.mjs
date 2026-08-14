import { test, expect } from '@playwright/test';

test('shows the sanitized Alignerr finding without horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('/alignerr-signin-finding.html');

  await expect(page.getByRole('heading', { name: 'Google sign-in appeared unresponsive' })).toBeVisible();
  await expect(page.getByText('Observed once · broader reproduction required')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Root cause and prevalence remain unknown' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Commission the applicant-flow audit/ })).toHaveAttribute('href', /^mailto:/);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasOverflow).toBe(false);

  await page.screenshot({
    path: `output/playwright/alignerr-signin-finding-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
