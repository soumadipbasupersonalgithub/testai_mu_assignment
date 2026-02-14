/**
 * Test Scenario 1: Simple Form Demo
 * ===================================
 * Steps:
 *   1. Open TestMu AI's Selenium Playground.
 *   2. Click "Simple Form Demo".
 *   3. Validate that the URL contains "simple-form-demo".
 *   4. Create a variable for a string value: "Welcome to TestMu AI".
 *   5. Enter the value in the "Enter Message" text box.
 *   6. Click "Get Checked Value".
 *   7. Validate the same message is displayed under "Your Message:" section.
 *
 * Locator strategies used:
 *   - Role-based (getByRole for navigation links)
 *   - Placeholder-based (getByPlaceholder for input field)
 *   - ID selector (#showInput, #message)
 *   - CSS selector (.form-group)
 *
 * Runs in parallel across: Chromium (Windows 10) & Firefox (macOS Catalina)
 */

const { test, expect } = require('../fixtures/test-fixtures');
const { PlaygroundPage } = require('../pages/PlaygroundPage');
const { SimpleFormPage } = require('../pages/SimpleFormPage');
const { SIMPLE_FORM } = require('../utils/constants');

test.describe('Test Scenario 1: Simple Form Demo', () => {
  let playgroundPage;
  let simpleFormPage;

  test.beforeEach(async ({ page }) => {
    playgroundPage = new PlaygroundPage(page);
    simpleFormPage = new SimpleFormPage(page);
  });

  test('should display entered message in "Your Message" section', async ({ page }) => {
    // Step 1: Navigate to Selenium Playground
    await test.step('Navigate to Selenium Playground', async () => {
      await playgroundPage.navigate();
    });

    // Step 2: Click "Simple Form Demo"
    await test.step('Click "Simple Form Demo" link', async () => {
      await playgroundPage.clickSimpleFormDemo();
    });

    // Step 3: Validate URL contains "simple-form-demo"
    await test.step('Validate URL contains "simple-form-demo"', async () => {
      await expect(page).toHaveURL(/simple-form-demo/);
    });

    // Step 4 & 5: Create message variable and enter it in the text box
    const testMessage = SIMPLE_FORM.MESSAGE; // "Welcome to TestMu AI"

    await test.step('Enter message in the text box', async () => {
      await simpleFormPage.enterMessage(testMessage);
    });

    // Step 6: Click "Get Checked Value"
    await test.step('Click "Get Checked Value" button', async () => {
      await simpleFormPage.clickGetCheckedValue();
    });

    // Step 7: Validate the displayed message matches the entered message
    await test.step('Validate displayed message matches entered text', async () => {
      const displayedText = await simpleFormPage.getDisplayedMessage();
      expect(displayedText).toBe(testMessage);
    });
  });
});
