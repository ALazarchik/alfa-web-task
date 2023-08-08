import { Locator, Page } from "@playwright/test";
import { AllProductsPage } from "./AllProductsPage";
import { REGULAR_PRODUCTS } from "../support/data/constants";

export class NavigationBar {
    readonly page: Page;
    readonly basketItemsCounter: Locator;
    readonly basketDropdown: Locator;
    readonly basketIcon: Locator;
    readonly goToBasketButton: Locator;
    readonly clearBasketButton: Locator;
    readonly basketItemsTitles: Locator;
    readonly basketItemsPrices: Locator;
    readonly basketTotalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.basketItemsCounter = page.locator('#basketContainer .basket-count-items');
        this.basketDropdown = page.locator('[aria-labelledby="dropdownBasket"]');
        this.basketIcon = page.locator('#basketContainer .basket_icon');
        this.goToBasketButton = page.getByText('Перейти в корзину');
        this.clearBasketButton = page.getByText('Очистить корзину');
        this.basketItemsTitles = page.locator('.basket-item-title');
        this.basketItemsPrices = page.locator('.basket-item-price');
        this.basketTotalPrice = page.locator('.basket_price');
    }

    async goToLoginPage(): Promise<void> {
        await this.page.getByText('Вход').click();
    }

    async forceClearBasketInDropdown(): Promise<void> {
        const updateBasketPromises = [ this.page.waitForResponse('**/basket/get'), this.page.waitForResponse('**/basket/clear') ];
        await new AllProductsPage(this.page).addSameProductsToBasket(REGULAR_PRODUCTS[0], 1);
        await this.basketIcon.click();            
        await this.clearBasketButton.click();
        await Promise.all(updateBasketPromises);
        await this.page.waitForTimeout(500);
    }
}