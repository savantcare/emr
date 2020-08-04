const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
    await page.goto('http://ptclient:80/pf/abcd', {waitUntil: 'domcontentloaded'}); // Goto the patient file link and wait for loading                                                                                                                                                            
});

describe('Test header and title of the page', () => {
    test('Title of the page', async () => {
        const title = await page.title();
        await expect(title).toBe('patient-file'); //Expect Title of the page                                                                                                                                                                                             
    }, timeout);
});
