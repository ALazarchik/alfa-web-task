import { Locator, Page, expect } from '@playwright/test';
import { Endpoint } from '../../types/types';

export async function checkNumberInElement(expectedNumber: number, element: Locator): Promise<void> {
    const actualNumber = Number(await element.innerText());
    expect(actualNumber).toEqual(expectedNumber);
}

export async function checkElementIsVisible(element: Locator): Promise<void> {
    await element.waitFor({ state: 'visible', timeout: 5000 });
}

export function checkPageIsOpened(expectedPage: Endpoint, page: Page): void {
    expect(page.url()).toContain(expectedPage.endpoint);
}

export async function checkElementContainsText(text: string, element: Locator): Promise<void> {
    const actualText = await element.innerText();
    expect(actualText).toContain(text);
}