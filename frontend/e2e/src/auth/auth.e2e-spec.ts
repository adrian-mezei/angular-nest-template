import { AppPage } from './auth.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display login message', () => {
        page.navigateTo();
        expect<any>(page.getLoginMessage()).toEqual('Bejelentkezés');
    });

    it('should display login button', () => {
        page.navigateTo();
        expect(page.getLoginButton().isPresent()).toBeTruthy();
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(
            jasmine.objectContaining({
                level: logging.Level.SEVERE,
            } as logging.Entry),
        );
    });
});
