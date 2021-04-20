const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Recommendation for Addition", () => {
  test(
    "Title of the page and Login to Patient File",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
      await page.waitFor(500);
      await loginP20(page);
      await page.waitFor(2000);
    },
    timeout
  );

  test('Check recommendations skill', async () => {
    await page.waitFor(1000);
    profilePage = new Promise(x => browser.once('targetcreated', target => x(target.page())));

    await page.waitForSelector('div > .container > div > div > .button--blue')
    await page.click('div > .container > div > div > .button--blue')
    await page.waitFor(500);
    ptProfilePage = await profilePage;

    await ptProfilePage.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close');
    await ptProfilePage.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close');
    await ptProfilePage.waitFor(500);

    await ptProfilePage.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(6) > div > div > b');
    await ptProfilePage.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(6) > div > div > b');
    await ptProfilePage.waitFor(500);

    await ptProfilePage.waitForSelector('#pane-recommendations #description > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-recommendations #description > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-recommendations #description > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitFor(500);
    await ptProfilePage.type('#pane-recommendations #description > .v-tribute > .el-textarea__inner','test');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(6) > div > div > span:nth-child(2)')
    
    element = await ptProfilePage.waitForSelector('div > div:nth-child(6) > div > div > span:nth-child(2)')
    await expect(element).toMatch('Saved successfully')

    await ptProfilePage.waitFor(5000);

  }, timeout);
  
  
});
afterAll(async done => {
  done();
});