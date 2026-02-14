/**
 * Test Constants
 * ==============
 * Centralized constants used across all test scenarios.
 * Keeping test data separate from test logic improves maintainability.
 */

/** Base URLs */
const URLS = {
  PLAYGROUND: '/selenium-playground/',
  SIMPLE_FORM: '/selenium-playground/simple-form-demo/',
  DRAG_DROP_SLIDERS: '/selenium-playground/drag-drop-range-sliders-demo/',
  INPUT_FORM: '/selenium-playground/input-form-demo/',
};

/** Test Data — Simple Form Demo */
const SIMPLE_FORM = {
  MESSAGE: 'Welcome to TestMu AI',
};

/** Test Data — Drag & Drop Slider */
const SLIDER = {
  DEFAULT_VALUE: '15',
  TARGET_VALUE: '95',
};

/** Test Data — Input Form Submit */
const INPUT_FORM = {
  NAME: 'John Doe',
  EMAIL: 'john.doe@testmuai.com',
  PASSWORD: 'SecureP@ss123',
  COMPANY: 'TestMu AI',
  WEBSITE: 'https://www.testmuai.com',
  COUNTRY: 'United States',
  CITY: 'San Francisco',
  ADDRESS_1: '123 Main Street',
  ADDRESS_2: 'Suite 456',
  STATE: 'California',
  ZIP: '94102',
  SUCCESS_MESSAGE: 'Thanks for contacting us, we will get back to you shortly.',
};

module.exports = {
  URLS,
  SIMPLE_FORM,
  SLIDER,
  INPUT_FORM,
};
