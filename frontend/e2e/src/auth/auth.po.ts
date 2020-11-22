import { browser, by, element, WebElement } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getLoginMessage() {
        return element(by.css('app-root .login-form h2')).getText() as Promise<string>;
    }

    getLoginButton() {
        return element(by.css('app-root .login-form div form button'));
    }
}
