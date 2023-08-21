import { ProductType, PromotionalProducts, RegularProducts } from '../types/types';
import { PRODUCT_TYPES, PROMOTIONAL_PRODUCTS, REGULAR_PRODUCTS } from '../data/constants';

export function chooseRandomProduct(productType: ProductType): RegularProducts | PromotionalProducts {
    return productType === PRODUCT_TYPES.regular 
        ? REGULAR_PRODUCTS[(Math.floor(Math.random() * REGULAR_PRODUCTS.length))] 
        : PROMOTIONAL_PRODUCTS[(Math.floor(Math.random() * PROMOTIONAL_PRODUCTS.length))];   
}


