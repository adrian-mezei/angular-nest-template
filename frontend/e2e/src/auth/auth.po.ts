import { browser, by, element, ElementFinder, WebElement } from 'protractor';

export class AppPage {
    navigateTo(): Promise<any> {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getLoginMessage(): Promise<any> {
        return element(by.css('app-root .login-form h2')).getText() as Promise<string>;
    }

    getLoginButton(): ElementFinder {
        return element(by.css('app-root .login-form div form button'));
    }
}
