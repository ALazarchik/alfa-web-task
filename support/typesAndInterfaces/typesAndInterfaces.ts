export type RegularProducts = 'Блокнот в точку' | 'Кошечка Мари' | 'Нотная тетрадь' | 'Гусь. Дедлайн' | 'Художник';

export type PromotionalProducts = 'Творческий беспорядок' | 'Игра престолов' | 'Black&Red';

export type ProductType = 'regular' | 'promotional';

export type PageNames = 'basketPage' | 'loginPage';

export interface ProductTypes {
    [key: string]: ProductType
}

export interface UserCredentials {
    login: string;
    password: string;
}

export interface Endpoint { endpoint: string };

export type PageEndpoint = {
    [key: string]: Endpoint;
};