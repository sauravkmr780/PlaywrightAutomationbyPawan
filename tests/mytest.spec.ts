import {test,expect} from '@playwright/test';

test.describe('My Test Suite', () => {
  test('should load the homepage and check title', async ({ page }) => {
    await page.goto('http://www.automationpractice.pl/index.php');
    const title: string = await page.title();
    console.log(title.trim());
    await expect(page).toHaveTitle(title);
    const url: string = await page.url();
    console.log(url);
    await expect(page).toHaveURL(url);
    await page.close();
  });
})