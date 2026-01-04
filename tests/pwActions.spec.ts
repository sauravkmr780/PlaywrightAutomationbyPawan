import {test, expect} from '@playwright/test';

test.describe('Playwright Actions practice', () => {
test('Playwright Actions practice for TextBox', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await expect(page.getByPlaceholder('Enter Name')).toBeVisible();
    await expect(page.getByPlaceholder('Enter Name')).toBeEnabled();
    expect(await page.getByPlaceholder('Enter Name').getAttribute('maxlength')).toBe('15');
    const name:string = 'John Doe';
    await page.getByPlaceholder('Enter Name').fill(name);
    const enteredValue :string = await page.getByPlaceholder('Enter Name').inputValue();
    expect(enteredValue).toBe(name);    
})

test('Playwright Actions practice for RadioButton', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await expect(page.getByLabel('Male', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Male', { exact: true })).toBeEnabled();
    await page.getByLabel('Male', { exact: true }).check();
    expect(await page.getByLabel('Male', { exact: true }).isChecked()).toBeTruthy(); 
})

test('Playwright Actions practice for CheckBox', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const count:number = await page.locator('label[for$="day"]').count();

    for (let i=0; i < count; i++) {
        const labelText:string = await page.locator('label[for$="day"]').nth(i).textContent() as string;
        if (labelText.trim() === 'Friday'){
        await page.locator('input[value$="day"]').nth(i).check();
        expect( await page.locator('input[value$="day"]').nth(i).isChecked()).toBeTruthy();
        break
        }
    }
})
})
