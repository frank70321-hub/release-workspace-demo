import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './release-gate-proof',
  testMatch: '**/*.spec.mjs',
  use: {
    baseURL: 'http://127.0.0.1:4174',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 4174',
    url: 'http://127.0.0.1:4174/release-gate.html',
    reuseExistingServer: true,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
