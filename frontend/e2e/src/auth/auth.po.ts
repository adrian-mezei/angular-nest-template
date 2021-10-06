import { browser, by, element, ElementFinder, WebElement } from 'protractor';

export class AppPage {
    async navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl);
    }

    async getLoginMessage(): Promise<string> {
        return element(by.css('app-root .login-form h2')).getText();
    }

    getLoginButton(): ElementFinder {
        return element(by.css('app-root .login-form div form button'));
    }
}
