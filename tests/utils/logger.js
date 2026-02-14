/**
 * Logger Utility
 * ==============
 * Captures network logs and console logs during test execution.
 * Attaches collected logs to the Playwright test report for debugging.
 */

const { test } = require('@playwright/test');

/**
 * Sets up network and console log capture on the given page.
 * Logs are collected into arrays and attached to the test report on teardown.
 *
 * @param {import('@playwright/test').Page} page - Playwright page instance
 * @param {import('@playwright/test').TestInfo} testInfo - Playwright test info
 * @returns {{ networkLogs: string[], consoleLogs: string[] }} Collected logs
 */
function setupLogCapture(page, testInfo) {
  const networkLogs = [];
  const consoleLogs = [];

  // Capture all network requests
  page.on('request', (request) => {
    networkLogs.push(`>> ${request.method()} ${request.url()}`);
  });

  // Capture all network responses
  page.on('response', (response) => {
    networkLogs.push(`<< ${response.status()} ${response.url()}`);
  });

  // Capture browser console messages
  page.on('console', (msg) => {
    consoleLogs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  // Capture page errors
  page.on('pageerror', (error) => {
    consoleLogs.push(`[PAGE_ERROR] ${error.message}`);
  });

  return { networkLogs, consoleLogs };
}

/**
 * Attaches collected logs to the Playwright HTML report.
 *
 * @param {import('@playwright/test').TestInfo} testInfo - Playwright test info
 * @param {{ networkLogs: string[], consoleLogs: string[] }} logs - Collected logs
 */
async function attachLogs(testInfo, { networkLogs, consoleLogs }) {
  if (networkLogs.length > 0) {
    await testInfo.attach('network-logs', {
      body: networkLogs.join('\n'),
      contentType: 'text/plain',
    });
  }

  if (consoleLogs.length > 0) {
    await testInfo.attach('console-logs', {
      body: consoleLogs.join('\n'),
      contentType: 'text/plain',
    });
  }
}

module.exports = {
  setupLogCapture,
  attachLogs,
};
