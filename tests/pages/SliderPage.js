/**
 * SliderPage — Page Object for Drag & Drop Sliders Demo
 * =======================================================
 * Handles interactions with the range slider controls.
 *
 * Locator strategies used:
 *   - CSS selector (input[type="range"])
 *   - XPath (for targeting specific slider by output value)
 *   - ID-based locator (for range value display)
 */

class SliderPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Locator: CSS selector — slider with default value 15 (third slider)
    this.slider15 = page.locator('#slider3 input[type="range"]');

    // Locator: ID-based — the output display showing current slider value
    this.rangeValueDisplay = page.locator('#rangeSuccess');
  }

  /**
   * Drag the "Default value 15" slider to the specified target value.
   * Uses incremental keyboard steps for precise control.
   *
   * @param {string} targetValue - The desired slider value (e.g., '95')
   */
  async dragSliderToValue(targetValue) {
    const slider = this.slider15;
    await slider.scrollIntoViewIfNeeded();

    // Focus the slider element
    await slider.focus();

    // Get the current value and calculate how many steps we need
    const currentValue = await slider.inputValue();
    const current = parseInt(currentValue, 10);
    const target = parseInt(targetValue, 10);
    const steps = target - current;

    if (steps > 0) {
      // Move right using ArrowRight key presses
      for (let i = 0; i < steps; i++) {
        await this.page.keyboard.press('ArrowRight');
      }
    } else if (steps < 0) {
      // Move left using ArrowLeft key presses
      for (let i = 0; i < Math.abs(steps); i++) {
        await this.page.keyboard.press('ArrowLeft');
      }
    }
  }

  /**
   * Get the currently displayed range value.
   * @returns {Promise<string>} The current range value text
   */
  async getRangeValue() {
    return await this.rangeValueDisplay.textContent();
  }
}

module.exports = { SliderPage };
