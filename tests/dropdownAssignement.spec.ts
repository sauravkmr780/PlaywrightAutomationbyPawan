import { test, expect } from '@playwright/test';

test.describe('Handling Dropdowns', () => {
    test('Verify Product Sorting and Information Retrieval', async ({ page }) => {
        // 1. Navigate
        await page.goto('https://www.bstackdemo.com/');
        
        // 2. Interact with dropdown
        const dropdown = page.locator('select:visible');
        await expect(dropdown).toBeVisible();
        await expect(dropdown).toBeEnabled();
        
        // Select option and wait for products to load
        await dropdown.selectOption('lowestprice');
        await expect(dropdown).toHaveValue('lowestprice');
        
        // Wait for products to be visible after sorting
        await page.waitForSelector('div.shelf-item__price', { state: 'visible' });

        // 3. Retrieve and verify product information (SINGLE LOOP)
        const priceLocator = page.locator('div.shelf-item__price');
        const nameLocator = page.locator('p.shelf-item__title');
        
        const priceCount = await priceLocator.count();
        const nameCount = await nameLocator.count();
        expect(priceCount).toBe(nameCount);
        
        // Get all prices and names efficiently
        const prices = await priceLocator.allTextContents();
        const names = await nameLocator.allTextContents();
        
        // Print all products
        console.log('\n=== All Products (Lowest to Highest) ===');
        prices.forEach((price, index) => {
            console.log(`Product ${index + 1}: ${names[index]} - ${price}`);
        });

        // 4. Lowest priced product (first after sorting lowest to highest)
        console.log('\n=== Lowest Priced Product ===');
        console.log(`Name: ${names[0]}, Price: ${prices[0]}`);

        // 5. Highest priced product (last after sorting lowest to highest)
        console.log('\n=== Highest Priced Product ===');
        console.log(`Name: ${names[names.length - 1]}, Price: ${prices[prices.length - 1]}`);
    });
});
