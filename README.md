# PlaywrightAutomationbyPawan
PlaywrightAutomationLearningbyPawan

## Allure Reporting Setup

### Installation and Configuration

#### 1. Install Allure Playwright
```bash
npm install -D allure-playwright
```

#### 2. Configure in playwright.config.ts
```typescript
reporter: [
  ['allure-playwright', {
    outputFolder: 'allure-results',
    detail: true,
    suiteTitle: false
  }]
]
```

#### 3. Add to .gitignore
```
/allure-results/
/allure-report/
```

#### 4. Add Scripts to package.json
```json
"scripts": {
  "test": "npx playwright test",
  "report": "npx allure generate allure-results -o allure-report && npx allure open allure-report"
}
```

### Running Tests and Generating Reports

#### Run Tests
```bash
# Using npm script
npm run test

# Or directly
npx playwright test

# Run specific test
npx playwright test tests/mytest.spec.ts

# Run on specific browser
npx playwright test --project=chromium

# Run in headed mode
npx playwright test --headed
```

#### Generate and View Report
```bash
# Using npm script (recommended)
npm run report

# Or directly
npx allure generate allure-results -o allure-report
npx allure open allure-report

# Or in one command
npx allure generate allure-results -o allure-report; npx allure open allure-report
```

### Sharing Reports

#### Option 1: Zip and Share
```bash
Compress-Archive -Path allure-report -DestinationPath AllureReport.zip
```
Share the zip file. Recipients can extract and run: `npx allure open allure-report`

#### Option 2: Deploy to GitHub Pages/Netlify
Push the `allure-report/` folder to a static hosting service for remote team access.

### Clean Reports
```bash
# Clean old reports before generating new ones
Remove-Item -Recurse -Force allure-report, allure-results
```

---

## Quick Reference
- **Run tests**: `npm run test`
- **Generate report**: `npm run report`
- **Report location**: `allure-report/` folder
- **Raw results**: `allure-results/` folder
