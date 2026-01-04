import { test, expect, Locator } from '@playwright/test';

test.describe('Playwright Built in locators practice', () => {
    test('should load the homepage', async ({ page }) => {
        await page.goto('https://demo.nopcommerce.com/');
        await page.waitForLoadState('networkidle'); // Wait for page to fully load

        // Add assertions to verify the page loaded
        await expect(page).toHaveURL(/nopcommerce/);
        await expect(page).toHaveTitle(/nopCommerce/)

        // // Example of using built-in locators
        // const logo: Locator = page.getByAltText('nopCommerce demo store');
        // await expect(logo).toBeVisible();

        // const headerText: Locator = page.getByText('Welcome to our store');
        // await expect(headerText).toBeVisible();

        // // Example of using built-in locators
        // await expect(page.getByAltText('nopCommerce demo store')).toBeVisible();
        // await expect(page.getByText('Welcome to our store')).toBeVisible();

        // await page.getByRole('link', {name: 'Register'}).click();
        // await expect(page).toHaveURL(/register/);
        // await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();

        // await page.getByLabel('First name:').fill('John');
        // await page.getByLabel('Last name:').fill('Doe');
        // await page.getByLabel('Email:').fill('john.doe@example.com');

        // // Placeholder for further actions like submitting the form
        // await page.getByPlaceholder('Search store').fill('laptop');
    });
});