import { Page } from '@playwright/test';

export class LoginPageBest {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators as getters
    get loginLink() {
        return this.page.getByRole('link', { name: 'Log in' });
    }

    get loginHeading() {
        return this.page.getByRole('heading', { name: 'Log in' });
    }

    get usernameInput() {
        return this.page.locator('#loginusername');
    }

    get passwordInput() {
        return this.page.locator('#loginpassword');
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'Log in' });
    }

    get closeButton() {
        return this.page.locator('button.btn.btn-secondary:visible');
    }

    // Actions
    async goto() {
        await this.page.goto('https://demoblaze.com/'); // Uses baseURL from config
    }

    async openLoginModal() {
        await this.loginLink.click();
        await this.loginHeading.waitFor({ state: 'visible' });
    }

    async login(username: string, password: string) {
        await this.openLoginModal();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async closeModal() {
        await this.closeButton.click();
    }
}

