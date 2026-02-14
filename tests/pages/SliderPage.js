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
   *
   * Strategy: Uses JavaScript evaluation to set the slider value and
   * dispatches an 'input' + 'change' event so the UI updates. This is
   * reliable on both local and cloud (LambdaTest) environments, avoiding
   * 80+ ArrowRight keypresses over the network.
   *
   * @param {string} targetValue - The desired slider value (e.g., '95')
   */
  async dragSliderToValue(targetValue) {
    const slider = this.slider15;
    await slider.scrollIntoViewIfNeeded();

    // Set the slider value via JavaScript and trigger the change event
    await slider.evaluate((el, val) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      ).set;
      nativeInputValueSetter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, targetValue);
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
