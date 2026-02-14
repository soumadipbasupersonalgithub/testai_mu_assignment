# TestMu AI — Playwright Test Automation Framework

Automated end-to-end test suite for the [TestMu AI Selenium Playground](https://www.testmuai.com/selenium-playground/) built with **Playwright** and **JavaScript**.

---

## Project Structure

```
testai_mu_assignment/
├── playwright.config.js          # Playwright configuration (parallel browsers, video, traces)
├── package.json                  # Node.js project manifest & npm scripts
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── tests/
    ├── fixtures/
    │   └── test-fixtures.js      # Custom test fixture with auto log capture
    ├── pages/                    # Page Object Model (POM) classes
    │   ├── PlaygroundPage.js     # Selenium Playground landing page
    │   ├── SimpleFormPage.js     # Simple Form Demo page
    │   ├── SliderPage.js         # Drag & Drop Sliders page
    │   └── InputFormPage.js      # Input Form Submit page
    ├── specs/                    # Test specifications
    │   ├── simpleFormDemo.spec.js      # Scenario 1: Simple Form Demo
    │   ├── dragDropSliders.spec.js     # Scenario 2: Drag & Drop Sliders
    │   └── inputFormSubmit.spec.js     # Scenario 3: Input Form Submit
    └── utils/
        ├── constants.js          # Centralized test data & URLs
        └── logger.js             # Network & console log capture utility
```

---

## Test Scenarios

| # | Scenario | Description |
|---|----------|-------------|
| 1 | **Simple Form Demo** | Enter a message and validate it displays correctly |
| 2 | **Drag & Drop Sliders** | Drag a slider from default 15 to 95 and validate |
| 3 | **Input Form Submit** | Validate empty form error, fill all fields, submit, verify success |

---

## Browser / OS Combinations (Parallel Execution)

| Project Name | Browser | Emulated OS |
|---|---|---|
| `chromium-windows10` | Chromium (Desktop Chrome) | Windows 10 |
| `firefox-macos` | Firefox (Desktop Firefox) | macOS Catalina |

Tests run **in parallel** across both browser configurations.

---

## Locator Strategies Used

The framework uses **5+ different locator strategies** as required:

1. **Role-based** — `page.getByRole('link', { name: '...' })`
2. **Placeholder-based** — `page.getByPlaceholder('...')`
3. **CSS Selector** — `page.locator('.class-name')`
4. **ID Selector** — `page.locator('#element-id')`
5. **Name Attribute** — `page.locator('input[name="..."]')`

---

## Artifacts Captured

Every test run automatically captures:

- **Video recordings** — Full video of each test
- **Screenshots** — Captured on every test
- **Trace files** — Includes network logs, DOM snapshots, console output
- **Network logs** — HTTP request/response details attached to report
- **Console logs** — Browser console messages attached to report

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

---

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Running Tests

```bash
# Run all tests (parallel across Chromium + Firefox)
npm test

# Run only Chromium tests
npm run test:chromium

# Run only Firefox tests
npm run test:firefox

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug tests interactively
npm run test:debug

# Open the HTML test report
npm run test:report
```

---

## Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports include:
- Test pass/fail status with step-by-step breakdowns
- Attached video recordings
- Attached screenshots
- Network and console logs
- Trace viewer links for interactive debugging
