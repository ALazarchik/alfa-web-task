/*
It is a bad practice to keep user's credentials hardcoded in the code. I usually use .env library to keep sensitive data on local machine 
and use it in tests.
*/

import { PageEndpoint, ProductTypes, PromotionalProducts, RegularProducts, UserCredentials } from "../typesAndInterfaces/typesAndInterfaces";

export const TEST_USER: UserCredentials = {
    login: 'test',
    password: 'test'
};

export const REGULAR_PRODUCTS: RegularProducts[] = [ 'Блокнот в точку', 'Кошечка Мари', 'Нотная тетрадь', 'Гусь. Дедлайн', 'Художник'];

export const PROMOTIONAL_PRODUCTS: PromotionalProducts[] = [ 'Творческий беспорядок', 'Игра престолов', 'Black&Red'];

export const PRODUCT_TYPES: ProductTypes = { regular:'regular', promotional:'promotional' };

export const PAGES_ENDPOINTS: PageEndpoint = {
    basketPage: {
        endpoint: '/basket'
    }
};