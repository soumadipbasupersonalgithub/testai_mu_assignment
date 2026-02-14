/**
 * SimpleFormPage — Page Object for Simple Form Demo
 * ===================================================
 * Handles interactions with the Simple Form Demo page.
 *
 * Locator strategies used:
 *   - ID selector (#get-input)
 *   - CSS selector (.form-group, #showInput)
 *   - Placeholder-based locator (getByPlaceholder)
 *   - Role-based locator (getByRole)
 */

class SimpleFormPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Locator: Placeholder-based — Enter Message text box
    this.messageInput = page.getByPlaceholder('Please enter your Message');

    // Locator: ID-based — Get Checked Value button
    this.getCheckedValueBtn = page.locator('#showInput');

    // Locator: CSS selector — displayed message in the right panel
    this.displayedMessage = page.locator('#message');
  }

  /**
   * Enter a message in the "Enter Message" text box.
   * @param {string} message - The message to type
   */
  async enterMessage(message) {
    await this.messageInput.scrollIntoViewIfNeeded();
    await this.messageInput.fill(message);
  }

  /**
   * Click the "Get Checked Value" button.
   */
  async clickGetCheckedValue() {
    await this.getCheckedValueBtn.click();
  }

  /**
   * Get the text displayed in the "Your Message" section.
   * @returns {Promise<string>} The displayed message text
   */
  async getDisplayedMessage() {
    return await this.displayedMessage.textContent();
  }
}

module.exports = { SimpleFormPage };
