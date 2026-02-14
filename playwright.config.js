// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration
 * ========================
 * - Parallel execution across 2 browser/OS combinations (Chromium + Firefox)
 * - Video recording enabled for all tests
 * - Screenshots captured on failure
 * - Network & console logs collected via trace
 * - HTML reporter for detailed test reports
 */
module.exports = defineConfig({
  /* Directory containing test files */
  testDir: './tests',

  /* Maximum time one test can run */
  timeout: 60_000,

  /* Maximum time expect() assertions can wait */
  expect: {
    timeout: 10_000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left in source */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Number of parallel workers */
  workers: process.env.CI ? 2 : 4,

  /* Reporter configuration — HTML report + console list */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  /* Shared settings for all projects */
  use: {
    /* Base URL for navigation shortcuts */
    baseURL: 'https://www.testmuai.com',

    /* Capture screenshot on every test (fullPage captures entire scrollable area) */
    screenshot: {
      mode: 'on',
      fullPage: true,
    },

    /* Record video for every test — size matches viewport for full browser capture */
    video: {
      mode: 'on',
      size: { width: 1280, height: 720 },
    },

    /* Collect trace (includes network logs, DOM snapshots, console) */
    trace: 'on',

    /* Viewport size — 1280x720 ensures full browser content is captured in video/screenshots */
    viewport: { width: 1280, height: 720 },

    /* Navigation timeout */
    navigationTimeout: 30_000,

    /* Action timeout */
    actionTimeout: 15_000,
  },

  /**
   * Projects — Parallel execution on 2 different browser/OS combinations
   * ====================================================================
   * Project 1: Chromium on Windows 10 (Desktop Chrome)
   * Project 2: Firefox on macOS Catalina (Desktop Firefox)
   *
   * NOTE: Playwright emulates OS user-agent strings; actual execution
   * happens on the host machine but simulates the target platform.
   */
  projects: [
    {
      name: 'chromium-windows10',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox-macos',
      use: {
        ...devices['Desktop Firefox'],
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; rv:120.0) Gecko/20100101 Firefox/120.0',
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
