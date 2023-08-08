import { Locator, Page } from "@playwright/test";
import { UserCredentials } from '../support/typesAndInterfaces/typesAndInterfaces';

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly enterButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.getByPlaceholder('Логин клиента');
        this.passwordInput = page.getByPlaceholder('Пароль клиента');
        this.enterButton = page.locator('[name="login-button"]');
    }

    async loginWithUserCredentials(userCredentials: UserCredentials): Promise<void> {
        const promisesToBeFullfilled = [ this.page.waitForResponse('**/basket/get'), this.page.waitForResponse('**/product/get') ];
        await this.loginInput.waitFor();
        await this.loginInput.type(userCredentials.login, { delay: 50 });
        await this.passwordInput.waitFor();
        await this.passwordInput.type(userCredentials.password, { delay: 50 });
        await this.enterButton.waitFor();
        await this.enterButton.click();
        await Promise.all(promisesToBeFullfilled);
    }
}