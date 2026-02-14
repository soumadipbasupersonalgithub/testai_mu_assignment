/**
 * PlaygroundPage — Page Object for Selenium Playground Landing Page
 * ==================================================================
 * Encapsulates navigation and link selection on the playground homepage.
 *
 * Locator strategies used:
 *   - CSS Selector (for page structure)
 *   - Text-based locator (getByRole with name)
 *   - XPath (for specific link targeting)
 */

class PlaygroundPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Locator: CSS selector — main content area
    this.mainContent = page.locator('.container-fluid.main-content');

    // Locator: Role-based with text — specific demo links
    this.simpleFormDemoLink = page.getByRole('link', { name: 'Simple Form Demo' });
    this.dragDropSlidersLink = page.getByRole('link', { name: 'Drag & Drop Sliders' });
    this.inputFormSubmitLink = page.getByRole('link', { name: 'Input Form Submit' });
  }

  /**
   * Navigate to the Selenium Playground landing page.
   */
  async navigate() {
    await this.page.goto('/selenium-playground/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click the "Simple Form Demo" link.
   */
  async clickSimpleFormDemo() {
    await this.simpleFormDemoLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click the "Drag & Drop Sliders" link.
   */
  async clickDragDropSliders() {
    await this.dragDropSlidersLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click the "Input Form Submit" link.
   */
  async clickInputFormSubmit() {
    await this.inputFormSubmitLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { PlaygroundPage };
