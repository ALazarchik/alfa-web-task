import { Page } from "@playwright/test";

export class StartPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

async visit(): Promise<void> {
        await this.page.goto('/');
    }
}