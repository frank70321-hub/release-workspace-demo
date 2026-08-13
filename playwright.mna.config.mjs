import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './release-gate-proof',
  testMatch: 'mna-model-qa.spec.mjs',
  use: {
    baseURL: 'http://127.0.0.1:4175',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
