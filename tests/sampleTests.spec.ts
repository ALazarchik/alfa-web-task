import { test } from '@playwright/test';
import { StartPage } from '../pageObjects/StartPage';
import { PAGES_ENDPOINTS, PRODUCT_TYPES, PROMOTIONAL_PRODUCTS, REGULAR_PRODUCTS, TEST_USER } from '../support/data/constants';
import { checkElementIsVisible, checkNumberInElement, checkPageIsOpened } from '../support/utils/checks';
import { NavigationBar } from '../pageObjects/NavigationBar';
import { LoginPage } from '../pageObjects/LoginPage';
import { AllProductsPage } from '../pageObjects/AllProductsPage';
import { DropdownBasketChecks } from '../support/utils/dropdownBasketChecks';
import { chooseRandomProduct } from '../support/utils/helpers';
import { PromotionalProducts, RegularProducts } from '../support/types/types';

test.describe('Basket tests:', async () => {

    let navigationBar: NavigationBar;

    test.beforeEach(async ({ page }) => {
        const startPage = new StartPage(page);
        await startPage.visit();

        navigationBar = new NavigationBar(page);
        await navigationBar.goToLoginPage();

        const loginPage = new LoginPage(page);
        await loginPage.loginWithUserCredentials(TEST_USER);
        await navigationBar.forceClearBasketInDropdown();
        
        await checkNumberInElement(0, navigationBar.basketItemsCounter);
    });

    test('[Test case 1] should go to empty basket', async ({ page }) => {
        await navigationBar.basketIcon.click({ timeout: 5000 });
        await checkElementIsVisible(navigationBar.basketDropdown);
        await navigationBar.goToBasketButton.click();
        checkPageIsOpened(PAGES_ENDPOINTS.basketPage, page);
    });

    Object.values(PRODUCT_TYPES).forEach(productType => {
        test(`[Test case 2, 3] should go to basket with 1 ${productType} product`, async ({ page }) => {
            const allProductsPage = new AllProductsPage(page);
            const productName = chooseRandomProduct(productType);
            await allProductsPage.addSameProductsToBasket(productName, 1);
            await checkNumberInElement(1, navigationBar.basketItemsCounter);
            await navigationBar.basketIcon.click({ timeout: 5000 });
            await new DropdownBasketChecks(page).checkBasketDropdownContainsAllData([productName]);
            await navigationBar.goToBasketButton.click();
            checkPageIsOpened(PAGES_ENDPOINTS.basketPage, page);
        });
    });
    
    test('[Test case 4] should go to basket with 9 different products', async ({ page }) => {
        const productsToAddNames: (RegularProducts | PromotionalProducts)[] = [ 
            PROMOTIONAL_PRODUCTS[0], PROMOTIONAL_PRODUCTS[1], REGULAR_PRODUCTS[0],
            REGULAR_PRODUCTS[1], PROMOTIONAL_PRODUCTS[1]
         ];
        const allProductsPage = new AllProductsPage(page);
        await allProductsPage.addSameProductsToBasket(productsToAddNames[0], 1);
        await checkNumberInElement(1, navigationBar.basketItemsCounter);
        await allProductsPage.addSameProductsToBasket(productsToAddNames[1], 2);
        await allProductsPage.addSameProductsToBasket(productsToAddNames[2], 2);
        await allProductsPage.addSameProductsToBasket(productsToAddNames[3], 2);
        await allProductsPage.addSameProductsToBasket(productsToAddNames[4], 2);
        await checkNumberInElement(9, navigationBar.basketItemsCounter);
        await navigationBar.basketIcon.click({ timeout: 5000 });
        await new DropdownBasketChecks(page).checkBasketDropdownContainsAllData(productsToAddNames);
        await navigationBar.goToBasketButton.click();
        checkPageIsOpened(PAGES_ENDPOINTS.basketPage, page);
    });
    
    test('[Test case 5] should go to basket with 9 promotional products of the same name', async ({ page }) => {
        const allProductsPage = new AllProductsPage(page);
        const productName = PROMOTIONAL_PRODUCTS[0];
        await allProductsPage.addSameProductsToBasket(productName, 9);
        await checkNumberInElement(9, navigationBar.basketItemsCounter);
        await navigationBar.basketIcon.click({ timeout: 5000 });
        await new DropdownBasketChecks(page).checkBasketDropdownContainsAllData([productName]);
        await navigationBar.goToBasketButton.click();
        checkPageIsOpened(PAGES_ENDPOINTS.basketPage, page);
    });
});

