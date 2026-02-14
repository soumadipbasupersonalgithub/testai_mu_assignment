// @ts-check
/**
 * LambdaTest Cloud Playwright Configuration
 * ==========================================
 * Runs tests in parallel on LambdaTest (TestMu AI) cloud infrastructure:
 *   - Project 1: Chromium on Windows 10
 *   - Project 2: Firefox on macOS Catalina
 *
 * Usage:
 *   npm run test:lambdatest          (both browsers in parallel)
 *   npm run test:lambdatest:chromium (Chromium / Windows 10 only)
 *   npm run test:lambdatest:firefox  (Firefox / macOS Catalina only)
 */

const { defineConfig } = require('@playwright/test');

// ───────────────────────────────────────────────────────────────────
// LambdaTest Credentials (override via LT_USERNAME / LT_ACCESS_KEY)
// ───────────────────────────────────────────────────────────────────
const LT_USERNAME = process.env.LT_USERNAME || '<<Enter Username>>';
const LT_ACCESS_KEY =
  process.env.LT_ACCESS_KEY || '<<Enter Access Key>>';

// Playwright client version — required for LambdaTest compatibility
const playwrightVersion = require('@playwright/test/package.json').version;

// ───────────────────────────────────────────────────────────────────
// Shared LambdaTest Options
// ───────────────────────────────────────────────────────────────────
const commonLTOptions = {
  user: LT_USERNAME,
  accessKey: LT_ACCESS_KEY,
  build: 'TestMu AI Playwright Certification',
  network: true,
  video: true,
  console: true,
  visual: true,
  playwrightClientVersion: playwrightVersion,
};

// ───────────────────────────────────────────────────────────────────
// Helper — build capabilities with a unique session name
// ───────────────────────────────────────────────────────────────────
function chromiumCaps(testName) {
  return {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
      ...commonLTOptions,
      platform: 'Windows 10',
      name: `${testName} - Chromium Windows 10`,
    },
  };
}

function firefoxCaps(testName) {
  return {
    browserName: 'pw-firefox',
    browserVersion: 'latest',
    'LT:Options': {
      ...commonLTOptions,
      platform: 'MacOS Catalina',
      name: `${testName} - Firefox macOS Catalina`,
    },
  };
}

/** Build a wsEndpoint from capabilities */
function wsEndpoint(caps) {
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(caps),
  )}`;
}

// ───────────────────────────────────────────────────────────────────
// Test file names (matched via testMatch glob)
// ───────────────────────────────────────────────────────────────────
const TEST_SPECS = [
  { file: 'simpleFormDemo', label: 'Simple Form Demo' },
  { file: 'dragDropSliders', label: 'Drag Drop Sliders' },
  { file: 'inputFormSubmit', label: 'Input Form Submit' },
];

// ───────────────────────────────────────────────────────────────────
// Build 6 projects — one per test-file × browser combination.
// Each project creates its own LambdaTest session so all 6 appear
// individually on the dashboard.
// ───────────────────────────────────────────────────────────────────
const projects = [];
for (const { file, label } of TEST_SPECS) {
  projects.push(
    {
      name: `${file}-chromium-win10`,
      testMatch: `**/${file}.spec.js`,
      use: {
        connectOptions: { wsEndpoint: wsEndpoint(chromiumCaps(label)) },
      },
    },
    {
      name: `${file}-firefox-macos`,
      testMatch: `**/${file}.spec.js`,
      use: {
        connectOptions: { wsEndpoint: wsEndpoint(firefoxCaps(label)) },
      },
    },
  );
}

// ───────────────────────────────────────────────────────────────────
// Configuration
// ───────────────────────────────────────────────────────────────────
module.exports = defineConfig({
  testDir: './tests',

  /* Longer timeouts for cloud execution */
  timeout: 120_000,
  expect: { timeout: 15_000 },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Retry once on failure */
  retries: 1,

  /* 6 parallel workers — one per LambdaTest session */
  workers: 6,

  /* Reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'lambdatest-report' }],
  ],

  /* Shared settings for all projects */
  use: {
    baseURL: 'https://www.lambdatest.com',
    viewport: { width: 1280, height: 720 },
    navigationTimeout: 60_000,
    actionTimeout: 30_000,
  },

  projects,
});
