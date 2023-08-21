import { Locator, Page } from "@playwright/test";
import { PromotionalProducts, RegularProducts } from "../support/types/types";

export class AllProductsPage {
    readonly page: Page;
    readonly allItems: Locator;
    readonly productsPrices: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.allItems = page.locator('.note-item.card');
        this.productsPrices = page.locator('.product_price');
    }

    async addSameProductsToBasket(productName: RegularProducts | PromotionalProducts, numberOfItems: number): Promise<void> {
        const basketChangePromises = [ this.page.waitForResponse('**/basket/create'), this.page.waitForResponse('**/basket/get') ];
        await this.allItems.filter({ hasText: productName }).locator('input').waitFor();
        await this.allItems.filter({ hasText: productName }).locator('input').clear({ force: true });
        await this.allItems.filter({ hasText: productName }).locator('input').type(numberOfItems.toString(), { delay: 200 });
        await this.allItems.filter({ hasText: productName }).locator('button').click();
        await Promise.all(basketChangePromises);
    }
}