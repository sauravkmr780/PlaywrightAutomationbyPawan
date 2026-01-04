import { Page, Locator } from '@playwright/test';

export class LoginPage {
    //define locator variables
    readonly page: Page;
    readonly loginLink: Locator;
    readonly loginHeading: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly closeButton: Locator;
    // add locators inside constructor
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.loginHeading = page.getByRole('heading', { name: 'Log in' });
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.closeButton = page.locator('button.btn.btn-secondary:visible')
    }
    // use custom actions /methods
    async goto() {
        await this.page.goto('https://demoblaze.com/');
    }

    async login(username: string, password: string) {
        await this.loginLink.click();
        await this.loginHeading.waitFor({ state: 'visible' });
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async closeModal() {
        await this.closeButton.click();
    }
}
