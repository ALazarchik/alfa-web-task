import { Locator, Page, expect } from '@playwright/test';
import { NavigationBar } from '../../pageObjects/NavigationBar';
import { PromotionalProducts, RegularProducts } from '../types/types';
import { checkElementContainsText, checkElementIsVisible } from './checks';

export class DropdownBasketChecks extends NavigationBar {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
    }
    
    async checkProductPriceIsShownInDropdownBasket(element: Locator): Promise<void> {
        const productPrice = await element.innerText();
        expect(productPrice).toMatch(/^(-\s\d+\sр\.)(\s)*(\d+\sр\.)*/g);
    }
    
    async checkDropdownBasketTotalPrice(): Promise<void> {
        const sumOfAllItemsPrices = (await this.basketItemsPrices.allInnerTexts())
            .map(textPrice => Number(textPrice.split(' ')[1]))
            .reduce((acc, cur) => acc + cur, 0);
        const basketTotalPrice = Number(await this.basketTotalPrice.innerText());
        expect(sumOfAllItemsPrices).toEqual(basketTotalPrice);
    }
    
    async checkBasketDropdownContainsAllData(productsNames: (RegularProducts | PromotionalProducts)[]): Promise<void> {
        await checkElementIsVisible(this.basketDropdown);
        for(let i = 0; i < productsNames.length; i++) {
            await checkElementContainsText(productsNames[i], this.basketItemsTitles);
            await this.checkProductPriceIsShownInDropdownBasket(this.basketItemsPrices)
        }
        await this.checkDropdownBasketTotalPrice();
    }
}