const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Chief Complaint for Addition", () => {
  let element, ptProfilePage, profilePage;

  test("Title of the page and Login to Patient File", async () => {
    const title = await page.title();
    await expect(title).toBe("patient-file"); //Expect Title of the page
    await page.waitForTimeout(1000);
    await loginP20(page);
    await page.waitForTimeout(500);

    profilePage = new Promise(x => browser.once('targetcreated', target => x(target.page())));

    await page.waitForSelector('div > .container > div > div > .button--blue')
    await page.click('div > .container > div > div > .button--blue')
    await page.waitForTimeout(500);
    ptProfilePage = await profilePage;

    await ptProfilePage.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close');
    await ptProfilePage.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close');
    await ptProfilePage.waitForTimeout(500);
  }, timeout);

  //======================================== Add Chief Complaint skill ===========================================
  test('Add Chief Complaint skill', async () => {
    await ptProfilePage.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    // Current social situation
    await ptProfilePage.waitForSelector('#pane-chief_complaint div > div > #description > .v-tribute > .el-input__inner');
    await ptProfilePage.click('#pane-chief_complaint div > div > #description > .v-tribute > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-chief_complaint div > div > #description > .v-tribute > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-chief_complaint div > div > #description > .v-tribute > .el-input__inner','changeCC');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(5) > div > div > span')
    
    element = await ptProfilePage.waitForSelector('div > div:nth-child(5) > div > div > span')
    await expect(element).toMatch('Saved successfully')
  }, timeout);

});
afterAll(async done => {
  done();
});