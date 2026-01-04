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

## CI/CD Pipeline with GitHub Actions

### Overview
Automated test execution using GitHub Actions with parameterized workflows for flexible testing across environments and browsers.

### Workflow Files
- **`.github/workflows/playwright-tests.yml`** - Main test execution workflow
- **`.github/workflows/deploy-report.yml`** - Automatic deployment to GitHub Pages

### Automated Scheduled Runs
- **Schedule**: Monday to Friday at 9 AM PST (5 PM UTC)
- **Default Configuration**:
  - Environment: `qa`
  - Test Suite: `all`
  - Browser: `chromium`
- **Workflow Behavior**:
  - ✅ Passes if all tests pass
  - ❌ Fails if any test fails
  - 📊 Reports are generated regardless of test results

### Manual Workflow Execution

#### Access Workflow
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **"Playwright Tests with Allure Report"**
4. Click **"Run workflow"** button

#### Workflow Parameters

**1. Environment** (Required)
- **qa** - QA environment (default)
- **stage** - Staging environment

**2. Test Suite** (Required)
- **all** - Run all test files (default)
- **single** - Run one specific test file
- **multiple** - Run multiple specific test files

**3. Test File(s)** (Optional)
- Required when Test Suite is "single" or "multiple"
- Examples:
  - Single: `tests/mytest.spec.ts`
  - Multiple: `tests/mytest.spec.ts tests/pwActions.spec.ts`
- Leave empty for "all" test suite

**4. Browser** (Required)
- **chromium** - Google Chrome (default)
- **firefox** - Mozilla Firefox
- **webkit** - Safari
- **all** - Run on all browsers

### Usage Examples

#### Example 1: Run All Tests on QA (Chromium)
```
Environment: qa
Test Suite: all
Test File(s): (leave empty)
Browser: chromium
```

#### Example 2: Run Single Test on Stage (Firefox)
```
Environment: stage
Test Suite: single
Test File(s): tests/dropdownAssignement.spec.ts
Browser: firefox
```

#### Example 3: Run Multiple Tests on QA (All Browsers)
```
Environment: qa
Test Suite: multiple
Test File(s): tests/mytest.spec.ts tests/pwActions.spec.ts
Browser: all
```

#### Example 4: Run All Tests on Stage (WebKit)
```
Environment: stage
Test Suite: all
Test File(s): (leave empty)
Browser: webkit
```

### Environment Configuration

Environment-specific URLs are configured in the workflow. Update these in `.github/workflows/playwright-tests.yml`:

```yaml
if [ "$ENV" == "qa" ]; then
  echo "BASE_URL=https://qa.example.com" >> $GITHUB_ENV
elif [ "$ENV" == "stage" ]; then
  echo "BASE_URL=https://stage.example.com" >> $GITHUB_ENV
fi
```

**To use in tests:**
```typescript
const baseUrl = process.env.BASE_URL || 'https://default.com';
await page.goto(baseUrl);
```

### Viewing Reports

#### Option 1: GitHub Pages (Recommended)
- **Live URL**: https://sauravkmr780.github.io/PlaywrightAutomationbyPawan
- Updates automatically after each test run
- No download required

#### Option 2: Download Artifacts
1. Go to **Actions** tab
2. Click on a workflow run
3. Scroll to **Artifacts** section
4. Download reports:
   - `allure-report-{env}-{suite}-{run#}` - Full Allure report
   - `allure-results-{env}-{suite}-{run#}` - Raw results
   - `playwright-report-{env}-{suite}-{run#}` - Playwright HTML report

#### Option 3: View Test Summary
Each workflow run shows a summary with:
- Environment tested
- Test suite executed
- Browser used
- Test files run
- Pass/Fail status
- Run number

**Note**: Reports are generated and uploaded even if tests fail, allowing you to analyze failures.

### Workflow Status
- **✅ Success**: All tests passed
- **❌ Failure**: One or more tests failed
- **Reports**: Generated in both success and failure cases

### Artifact Retention
- All artifacts are kept for **30 days**
- Automatically cleaned up after retention period

### GitHub Pages Setup (One-time)

If not already enabled:
1. Go to **Repository Settings**
2. Navigate to **Pages** section (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

Your reports will be available at: `https://[username].github.io/[repository-name]`

### Workflow Triggers

The workflow runs automatically on:
1. **Schedule**: Mon-Fri at 9 AM PST
2. **Push**: When code is pushed to `master` branch
3. **Manual**: Via GitHub Actions UI with custom parameters

### Troubleshooting

#### Workflow Shows as Failed
- This is **expected** when tests fail
- Check Allure reports to see which tests failed
- Reports are still generated and available for download
- Fix the failing tests and re-run the workflow

#### Tests Not Running
- Check if workflow file is in `.github/workflows/` folder
- Verify GitHub Actions is enabled in repository settings
- Check for syntax errors in workflow YAML

#### Reports Not Deploying
- Ensure GitHub Pages is enabled
- Check deploy workflow completed successfully
- Verify artifacts were uploaded from test workflow
- Note: Deploy workflow runs even if tests fail

#### Environment Variables Not Working
- Update BASE_URL in workflow file with actual URLs
- Access via `process.env.BASE_URL` in tests
- Ensure environment parameter is passed correctly

### Workflow Status Badge

Add this to your README to show workflow status:
```markdown
![Playwright Tests](https://github.com/sauravkmr780/PlaywrightAutomationbyPawan/actions/workflows/playwright-tests.yml/badge.svg)
```

---

## Page Object Model (POM) Setup

### Overview
This project uses the Page Object Model design pattern to organize test code and make it maintainable and reusable.

### Folder Structure
```
project-root/
├── pages/               # Page Object classes
│   └── LoginPage.ts    # Example page object
├── tests/              # Test files
│   └── demoblaze.spec.ts
```

### Creating a Page Object

#### 1. Create Page Class (pages/LoginPage.ts)

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    // Define locator variables
    readonly page: Page;
    readonly loginLink: Locator;
    readonly loginHeading: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    
    // Initialize locators in constructor
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.loginHeading = page.getByRole('heading', { name: 'Log in' });
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }
    
    // Action methods (no assertions)
    async goto() {
        await this.page.goto('https://demoblaze.com/');
    }

    async openLoginModal() {
        await this.loginLink.click();
    }

    async fillCredentials(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}
```

#### 2. Use Page Object in Tests (tests/demoblaze.spec.ts)

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
    test('User should login successfully', async ({ page }) => {
        // Create page object instance
        const loginPage = new LoginPage(page);
        
        // Use page object methods
        await loginPage.goto();
        await loginPage.openLoginModal();
        
        // Assertions in test (not in page object)
        await expect(loginPage.loginHeading).toBeVisible();
        
        // Continue with actions
        await loginPage.fillCredentials('testuser', 'password');
        await loginPage.clickLogin();
        
        // More assertions
        await expect(page.getByText('Welcome')).toBeVisible();
    });
});
```

### POM Best Practices

#### 1. Page Object Structure
- **Locators**: Define as `readonly` properties in constructor
- **Actions**: Simple methods that perform UI interactions
- **No Assertions**: Keep assertions in test files, not page objects
- **Reusability**: Methods should be generic and reusable

#### 2. Locator Strategies
```typescript
// Prefer role-based locators (more robust)
page.getByRole('button', { name: 'Submit' })

// Use text locators for visible text
page.getByText('Welcome to our store')

// Use IDs when necessary
page.locator('#username')

// Avoid complex CSS/XPath when possible
```

#### 3. Method Naming Conventions
```typescript
// Actions: verb-based
async clickLogin()
async fillUsername(username: string)
async selectOption(value: string)

// Navigation
async goto()
async navigateToCheckout()

// Complex flows
async completeRegistration(userData: UserData)
```

#### 4. Separation of Concerns

**Page Object (pages/LoginPage.ts):**
```typescript
// ✅ Good: Simple actions
async fillUsername(username: string) {
    await this.usernameInput.fill(username);
}

// ❌ Bad: Including assertions
async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username); // Don't do this
}
```

**Test File (tests/login.spec.ts):**
```typescript
// ✅ Good: Assertions in test
await loginPage.fillUsername('testuser');
await expect(loginPage.usernameInput).toHaveValue('testuser');

// ✅ Good: Composing actions
await loginPage.openLoginModal();
await expect(loginPage.loginHeading).toBeVisible();
await loginPage.fillCredentials('user', 'pass');
await loginPage.clickLogin();
```

### Example: Complete Page Object

#### HomePage.ts
```typescript
import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly logo: Locator;
    readonly searchBox: Locator;
    readonly cartIcon: Locator;
    readonly loginLink: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByAltText('Company Logo');
        this.searchBox = page.getByPlaceholder('Search');
        this.cartIcon = page.getByRole('link', { name: 'Cart' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
    }
    
    async goto() {
        await this.page.goto('/');
    }

    async search(query: string) {
        await this.searchBox.fill(query);
        await this.searchBox.press('Enter');
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async goToLogin() {
        await this.loginLink.click();
    }
}
```

### Benefits of This Approach

1. **Maintainability**: Change UI locators in one place
2. **Reusability**: Use page objects across multiple tests
3. **Readability**: Tests are cleaner and easier to understand
4. **Scalability**: Easy to add new pages and elements
5. **Type Safety**: TypeScript provides autocomplete and type checking
6. **Testability**: Assertions stay in tests for better test clarity

### Tips

- Create one page object per page/component
- Keep methods small and focused
- Use TypeScript for better IDE support
- Document complex interactions
- Don't over-engineer - start simple and refactor as needed

---

## Quick Reference
- **Run tests locally**: `npm run test`
- **Generate local report**: `npm run report`
- **Report location (local)**: `allure-report/` folder
- **Raw results (local)**: `allure-results/` folder
- **CI/CD Reports (live)**: https://sauravkmr780.github.io/PlaywrightAutomationbyPawan
- **GitHub Actions**: Go to Actions tab in repository
- **Manual Trigger**: Actions → Playwright Tests → Run workflow
- **Page Objects**: Located in `pages/` folder
- **Test Files**: Located in `tests/` folder
