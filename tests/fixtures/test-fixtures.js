/**
 * Custom Test Fixture
 * ====================
 * Extends Playwright's base test with automatic log capture (network + console).
 * Every test automatically benefits from:
 *   - Network request/response logging
 *   - Browser console log capture
 *   - Automatic attachment of logs to HTML report
 *
 * Usage: Import { test, expect } from this file instead of '@playwright/test'.
 */

const base = require('@playwright/test');
const { setupLogCapture, attachLogs } = require('../utils/logger');

/**
 * Extended test fixture that sets up network and console log capture
 * for every test automatically.
 */
const test = base.test.extend({
  /**
   * Override the default page fixture to inject log capture.
   * Logs are automatically attached to the test report after each test.
   * If running on LambdaTest, test status is also reported to their dashboard.
   */
  page: async ({ page }, use, testInfo) => {
    // Set up log capture before the test runs
    const logs = setupLogCapture(page, testInfo);

    // Hand the page to the test
    await use(page);

    // After the test completes, attach logs to the report
    await attachLogs(testInfo, logs);

    // Report test status to LambdaTest dashboard.
    // On local runs this is a harmless no-op (the evaluate just runs an empty function).
    const testStatus =
      testInfo.status === testInfo.expectedStatus ? 'passed' : 'failed';
    try {
      await page.evaluate(
        () => { },
        `lambdatest_action: ${JSON.stringify({
          action: 'setTestStatus',
          arguments: {
            status: testStatus,
            remark: `${testInfo.title} — ${testStatus}`,
          },
        })}`,
      );
    } catch {
      // Ignore — page may already be closed or not running on LambdaTest
    }
  },
});

const expect = base.expect;

module.exports = { test, expect };
