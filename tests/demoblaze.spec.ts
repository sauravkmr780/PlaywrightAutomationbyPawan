import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginPageBest } from '../pages/loginPageBest';

test.describe('Playwright POM Setup', () => { 
    test('Playwright Actions practice for TextBox by Constructor approach', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('testuser728785', 'Test@1234');
    });
    test('Playwright Actions practice for TextBox by Getters approach', async ({ page }) => {
        const loginPage = new LoginPageBest(page);
        await loginPage.goto();
        await loginPage.login('testuser728785', 'Test@1234');
    });
});