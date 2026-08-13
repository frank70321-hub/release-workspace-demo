import { test, expect } from '@playwright/test';

test('shows the editable B2B portfolio proof without horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('/b2b-portfolio.html');

  await expect(page.getByRole('heading', { name: 'Complex work, made easy for buyers to trust' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download the PDF' })).toHaveAttribute(
    'href',
    'assets/b2b-portfolio/B2B-PROFESSIONAL-PORTFOLIO-SAMPLE.pdf',
  );
  await expect(page.getByRole('link', { name: 'Download the editable PowerPoint' })).toHaveAttribute(
    'href',
    'assets/b2b-portfolio/B2B-PROFESSIONAL-PORTFOLIO-SAMPLE.pptx',
  );
  await expect(page.getByText('US$120')).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.screenshot({ path: `output/playwright/b2b-portfolio-${testInfo.project.name}.png`, fullPage: true });
});
