import { AppPage } from './auth.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display login message', async () => {
        await page.navigateTo();
        expect(await page.getLoginMessage()).toEqual('Bejelentkezés2');
    });

    it('should display login button', async () => {
        await page.navigateTo();
        expect((await page.getLoginButton()).isPresent()).toBeTruthy();
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
