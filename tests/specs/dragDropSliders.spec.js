/**
 * Test Scenario 2: Drag & Drop Sliders
 * ======================================
 * Steps:
 *   1. Open TestMu AI's Selenium Playground.
 *   2. Click "Drag & Drop Sliders".
 *   3. Select the slider with "Default value 15".
 *   4. Drag the slider bar to make the value 95.
 *   5. Validate that the range value display shows 95.
 *
 * Locator strategies used:
 *   - Role-based (getByRole for navigation link)
 *   - CSS selector (input[type="range"], #slider3)
 *   - ID-based selector (#rangeSuccess)
 *
 * Runs in parallel across: Chromium (Windows 10) & Firefox (macOS Catalina)
 */

const { test, expect } = require('../fixtures/test-fixtures');
const { PlaygroundPage } = require('../pages/PlaygroundPage');
const { SliderPage } = require('../pages/SliderPage');
const { SLIDER } = require('../utils/constants');

test.describe('Test Scenario 2: Drag & Drop Sliders', () => {
  let playgroundPage;
  let sliderPage;

  test.beforeEach(async ({ page }) => {
    playgroundPage = new PlaygroundPage(page);
    sliderPage = new SliderPage(page);
  });

  test('should drag "Default value 15" slider to 95', async ({ page }) => {
    // Step 1: Navigate to Selenium Playground
    await test.step('Navigate to Selenium Playground', async () => {
      await playgroundPage.navigate();
    });

    // Step 2: Click "Drag & Drop Sliders"
    await test.step('Click "Drag & Drop Sliders" link', async () => {
      await playgroundPage.clickDragDropSliders();
    });

    // Step 3: Verify we're on the sliders page
    await test.step('Verify navigation to sliders page', async () => {
      await expect(page).toHaveURL(/drag-drop-range-sliders/);
    });

    // Step 4: Drag the "Default value 15" slider to 95
    await test.step('Drag slider from 15 to 95', async () => {
      await sliderPage.dragSliderToValue(SLIDER.TARGET_VALUE);
    });

    // Step 5: Validate the range value shows 95
    await test.step('Validate range value displays 95', async () => {
      const rangeValue = await sliderPage.getRangeValue();
      expect(rangeValue.trim()).toBe(SLIDER.TARGET_VALUE);
    });
  });
});
