const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
    await page.goto('http://localhost:80/pf/abcd', {waitUntil: 'domcontentloaded'}); // Goto the patient file link and wait for loading
});

describe('Test header and title of the page', () => {
    test('Title of the page', async () => {
        const title = await page.title();
        await expect(title).toBe('patient-file'); //Expect Title of the page
    }, timeout);

    test('Test for Reminder', async () => {
        await page.waitForSelector('div:nth-child(3) > .el-card > .el-card__header > .clearfix > span')
        await page.click('div:nth-child(3) > .el-card > .el-card__header > .clearfix > span')
        let element = await page.waitForSelector('div:nth-child(3) > .el-card > .el-card__header > .clearfix > span');
        await expect(element).toMatch('Reminders');  //Expect Reminder name
        //await page.screenshot({ path: "testscreenshot/remstart.png" });
   }, timeout);

    test('Test for ADD Reminder', async () => {
        await page.waitForSelector('.el-card:nth-child(2) > .el-card__header > .clearfix > .el-button-group > .el-button--success > span')
        await page.click('.el-card:nth-child(2) > .el-card__header > .clearfix > .el-button-group > .el-button--success > span') //Click on add icon
        //await page.screenshot({ path: "testscreenshot/remclickadd.png" });

        await page.waitForSelector('.el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner');
        await page.click('.el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner');
        await page.type('.el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner', 'jaykalima2020'); //Type for add value
        //await page.screenshot({ path: "testscreenshot/remaddtype.png" });

        await page.waitForSelector('.el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(1) > span');
        await page.click('.el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(1) > span'); //Click on submit button
  
        //await page.screenshot({ path: "testscreenshot/remaddsub.png" });
        await delay(5000);
        await page.keyboard.press(`Escape`);
    }, timeout);

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }

});
