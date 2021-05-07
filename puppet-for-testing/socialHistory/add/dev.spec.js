const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Social History for Addition", () => {
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

  //======================================== Add Social History skill ===========================================
  test('Add Social History skill', async () => {
    await ptProfilePage.waitForSelector('div > div > div > .A4 > div > div:nth-child(10) > div > div > b');
    await ptProfilePage.click('div > div > div > .A4 > div > div:nth-child(10) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    // Current social situation
    await ptProfilePage.waitForSelector('#pane-social_history div > div > #current_social_situation > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-social_history div > div > #current_social_situation > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-social_history div > div > #current_social_situation > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-social_history div > div > #current_social_situation > .v-tribute > .el-textarea__inner','addCurSS');

    // Education / Work / Military Hx
    await ptProfilePage.waitForSelector('#pane-social_history div > div > #education_work_history > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-social_history div > div > #education_work_history > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-social_history div > div > #education_work_history > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-social_history div > div > #education_work_history > .v-tribute > .el-textarea__inner','addEduWM');

    // Social supports
    await ptProfilePage.waitForSelector('#pane-social_history div > div > #social_supports > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-social_history div > div > #social_supports > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-social_history div > div > #social_supports > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-social_history div > div > #social_supports > .v-tribute > .el-textarea__inner','addSocSup');

    // Developmental history
    await ptProfilePage.waitForSelector('#pane-social_history div > div > #developmental_history > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-social_history div > div > #developmental_history > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-social_history div > div > #developmental_history > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-social_history div > div > #developmental_history > .v-tribute > .el-textarea__inner','addDevHis');

    // Trauma history
    await ptProfilePage.waitForSelector('#pane-social_history div > div > #trauma_history > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-social_history div > div > #trauma_history > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-social_history div > div > #trauma_history > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-social_history div > div > #trauma_history > .v-tribute > .el-textarea__inner','addTraHis');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(10) > div > div > span:nth-child(2)')
    
    element = await ptProfilePage.waitForSelector('div > div:nth-child(10) > div > div > span:nth-child(2)')
    await expect(element).toMatch('Saved successfully')
  }, timeout);

});
afterAll(async done => {
  done();
});