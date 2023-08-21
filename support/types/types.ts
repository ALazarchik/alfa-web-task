export type RegularProducts = 'Блокнот в точку' | 'Кошечка Мари' | 'Нотная тетрадь' | 'Гусь. Дедлайн' | 'Художник';

export type PromotionalProducts = 'Творческий беспорядок' | 'Игра престолов' | 'Black&Red';

export type ProductType = 'regular' | 'promotional';

export type PageNames = 'basketPage' | 'loginPage';

export type ProductTypes = {
    [key: string]: ProductType
}

export type UserCredentials = {
    login: string;
    password: string;
}

export type Endpoint = { endpoint: string };

export type PageEndpoint = {
    [key: string]: Endpoint;
};