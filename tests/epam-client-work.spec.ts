import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work navigation', () => {
  test('should open Client Work page from Services menu', async ({ page }) => {
    // Navigate to the EPAM homepage.
    await page.goto('https://www.epam.com/');
    await expect(page).toHaveURL('https://www.epam.com/');

    // Open the Services section from the header navigation.
    const servicesLink = page.locator('a.top-navigation__item-link.js-op[href="/services"]').first();
    await expect(servicesLink).toBeVisible();
    await servicesLink.evaluate((el) => (el as HTMLAnchorElement).click());

    await expect(page).toHaveURL('https://www.epam.com/services');
    await expect(page).toHaveTitle(/Services \| EPAM/);

    // Click the Explore Our Client Work link from the Services page.
    const clientWorkLink = page.getByRole('link', { name: /Explore Our Client Work/i }).first();
    await expect(clientWorkLink).toBeVisible();
    await clientWorkLink.click();

    // Validate that the Client Work page is displayed.
    await expect(page).toHaveURL('https://www.epam.com/services/client-work');
    await expect(page).toHaveTitle('Client Work');
    await expect(page.getByRole('heading', { name: /Client Work/i }).first()).toBeVisible();
  });
});
