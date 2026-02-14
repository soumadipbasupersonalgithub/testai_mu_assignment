/**
 * Test Scenario 3: Input Form Submit
 * ====================================
 * Steps:
 *   1. Open TestMu AI's Selenium Playground and click "Input Form Submit".
 *   2. Click "Submit" without filling in any information.
 *   3. Assert "Please fill in the fields" error message.
 *   4. Fill in Name, Email, and other fields.
 *   5. Select "United States" from the Country drop-down using text property.
 *   6. Fill in all remaining fields and click "Submit".
 *   7. Validate success message:
 *      "Thanks for contacting us, we will get back to you shortly."
 *
 * Locator strategies used:
 *   - ID selector (#name, #inputEmail4, #inputPassword4, etc.)
 *   - Name attribute selector (select[name="country"])
 *   - Placeholder-based locator (getByPlaceholder)
 *   - Role-based locator (button[type="submit"])
 *   - CSS selector (#seleniumform, .success-msg)
 *
 * Runs in parallel across: Chromium (Windows 10) & Firefox (macOS Catalina)
 */

const { test, expect } = require('../fixtures/test-fixtures');
const { PlaygroundPage } = require('../pages/PlaygroundPage');
const { InputFormPage } = require('../pages/InputFormPage');
const { INPUT_FORM } = require('../utils/constants');

test.describe('Test Scenario 3: Input Form Submit', () => {
  let playgroundPage;
  let inputFormPage;

  test.beforeEach(async ({ page }) => {
    playgroundPage = new PlaygroundPage(page);
    inputFormPage = new InputFormPage(page);
  });

  test('should show validation error when submitting empty form, then succeed with valid data', async ({
    page,
  }) => {
    // Step 1: Navigate to Selenium Playground and click "Input Form Submit"
    await test.step('Navigate to Input Form Submit page', async () => {
      await playgroundPage.navigate();
      await playgroundPage.clickInputFormSubmit();
      await expect(page).toHaveURL(/input-form-demo/);
    });

    // Step 2: Click Submit without filling in any information
    await test.step('Click Submit without filling the form', async () => {
      await inputFormPage.clickSubmit();
    });

    // Step 3: Assert "Please fill in the fields" error message
    // HTML5 required fields trigger browser-native validation. The browser shows
    // "Please fill out this field." (Chrome) or similar. We verify:
    //   a) The form is invalid (checkValidity() === false)
    //   b) The first invalid field has a "Please fill" validation message
    //   c) The success message is NOT displayed (form was not submitted)
    await test.step('Assert "Please fill in the fields" validation error', async () => {
      // Verify form is invalid
      const isValid = await inputFormPage.isFormValid();
      expect(isValid).toBe(false);

      // Verify browser validation message contains "Please fill"
      const validationMsg = await inputFormPage.getFirstValidationMessage();
      expect(validationMsg).toContain('Please fill');

      // Verify success message is NOT visible (form submission was blocked)
      const successVisible = await inputFormPage.successMessage.isVisible();
      expect(successVisible).toBe(false);
    });

    // Steps 4, 5, 6: Fill in all fields including Country dropdown
    await test.step('Fill in all form fields with valid data', async () => {
      await inputFormPage.fillForm({
        name: INPUT_FORM.NAME,
        email: INPUT_FORM.EMAIL,
        password: INPUT_FORM.PASSWORD,
        company: INPUT_FORM.COMPANY,
        website: INPUT_FORM.WEBSITE,
        country: INPUT_FORM.COUNTRY, // "United States" — selected by visible text
        city: INPUT_FORM.CITY,
        address1: INPUT_FORM.ADDRESS_1,
        address2: INPUT_FORM.ADDRESS_2,
        state: INPUT_FORM.STATE,
        zip: INPUT_FORM.ZIP,
      });
    });

    // Verify form is now valid before submission
    await test.step('Verify form passes validation after filling all fields', async () => {
      const isValid = await inputFormPage.isFormValid();
      expect(isValid).toBe(true);
    });

    // Step 6 (continued): Click Submit
    await test.step('Submit the completed form', async () => {
      await inputFormPage.clickSubmit();
    });

    // Step 7: Validate success message
    await test.step('Validate success message after submission', async () => {
      const successMsg = await inputFormPage.getSuccessMessage();
      expect(successMsg).toContain(INPUT_FORM.SUCCESS_MESSAGE);
    });
  });
});
