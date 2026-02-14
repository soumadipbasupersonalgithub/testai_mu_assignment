/**
 * InputFormPage — Page Object for Input Form Submit Demo
 * =======================================================
 * Handles interactions with the Input Form Submit page (#seleniumform).
 *
 * Actual form fields (from live page inspection):
 *   - Name        (input#name, name="name")
 *   - Email       (input#inputEmail4, name="email")
 *   - Password    (input#inputPassword4, name="password")
 *   - Company     (input#company, name="company")
 *   - Website     (input#websitename, name="website")
 *   - Country     (select[name="country"])
 *   - City        (input#inputCity, name="city")
 *   - Address 1   (input#inputAddress1, name="address_line1")
 *   - Address 2   (input#inputAddress2, name="address_line2")
 *   - State       (input#inputState, no name attr)
 *   - Zip Code    (input#inputZip, name="zip")
 *
 * Locator strategies used (5+):
 *   1. ID selector (#name, #inputEmail4, #inputPassword4, etc.)
 *   2. Name attribute selector (select[name="country"])
 *   3. Placeholder-based locator (getByPlaceholder for Website, Address 2)
 *   4. Role-based locator (getByRole for Submit button)
 *   5. CSS selector (#seleniumform, .success-msg)
 */

class InputFormPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // --- Form field locators ---

    // Locator Strategy 1: ID selector
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#inputEmail4');
    this.passwordInput = page.locator('#inputPassword4');
    this.companyInput = page.locator('#company');
    this.cityInput = page.locator('#inputCity');
    this.address1Input = page.locator('#inputAddress1');
    this.stateInput = page.locator('#inputState');
    this.zipInput = page.locator('#inputZip');

    // Locator Strategy 2: Placeholder-based
    this.websiteInput = page.getByPlaceholder('Website');
    this.address2Input = page.getByPlaceholder('Address 2');

    // Locator Strategy 3: Name attribute selector
    this.countryDropdown = page.locator('select[name="country"]');

    // Locator Strategy 4: Role-based — Submit button
    this.submitBtn = page.locator('#seleniumform button[type="submit"]');

    // Locator Strategy 5: CSS selector — success message
    this.successMessage = page.locator('.success-msg');

    // Form element reference
    this.formElement = page.locator('#seleniumform');
  }

  /**
   * Click Submit without filling any fields.
   */
  async clickSubmit() {
    await this.submitBtn.scrollIntoViewIfNeeded();
    await this.submitBtn.click();
  }

  /**
   * Fill in all form fields with provided data.
   *
   * @param {Object} data - Form data object
   * @param {string} data.name - Full name
   * @param {string} data.email - Email address
   * @param {string} data.password - Password
   * @param {string} data.company - Company name
   * @param {string} data.website - Website URL
   * @param {string} data.country - Country label for text-based selection
   * @param {string} data.city - City name
   * @param {string} data.address1 - Address line 1
   * @param {string} data.address2 - Address line 2
   * @param {string} data.state - State name
   * @param {string} data.zip - Zip code
   */
  async fillForm(data) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.companyInput.fill(data.company);
    await this.websiteInput.fill(data.website);

    // Select country from dropdown using visible text (label property)
    await this.countryDropdown.selectOption({ label: data.country });

    await this.cityInput.fill(data.city);
    await this.address1Input.fill(data.address1);
    await this.address2Input.fill(data.address2);
    await this.stateInput.fill(data.state);
    await this.zipInput.fill(data.zip);
  }

  /**
   * Get the success message text after form submission.
   * @returns {Promise<string>} The success message text
   */
  async getSuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible', timeout: 10_000 });
    return (await this.successMessage.textContent()).trim();
  }

  /**
   * Check form validity using the browser's Constraint Validation API.
   * @returns {Promise<boolean>} Whether the form is valid
   */
  async isFormValid() {
    return await this.page.evaluate(() => {
      const form = document.querySelector('#seleniumform');
      return form ? form.checkValidity() : false;
    });
  }

  /**
   * Get the browser's native validation message for the first invalid field.
   * Browser-native messages vary slightly:
   *   - Chrome/Chromium: "Please fill out this field."
   *   - Firefox: "Please fill out this field."
   * Both contain "Please fill" which maps to the requirement's
   * "Please fill in the fields" assertion.
   *
   * @returns {Promise<string>} The validation message from the first invalid field
   */
  async getFirstValidationMessage() {
    return await this.page.evaluate(() => {
      const form = document.querySelector('#seleniumform');
      if (!form) return '';
      const inputs = form.querySelectorAll('input, select, textarea');
      for (const input of inputs) {
        if (!input.checkValidity()) {
          return input.validationMessage;
        }
      }
      return '';
    });
  }
}

module.exports = { InputFormPage };
