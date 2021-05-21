const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Assessment & Diagnosis for Addition", () => {
  let element, ptProfilePage, profilePage, isPresent;

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

  //======================================== Add Assessment & Diagnosis skill ===========================================
  test('Add Assessment & Diagnosis skill', async () => {
    await ptProfilePage.waitForSelector('.A4 > div > div:nth-child(2) > div > div > b');
    await ptProfilePage.click('.A4 > div > div:nth-child(2) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    //Diagnosis
    await ptProfilePage.waitForSelector('#pane-diagnosis div > div > .el-autocomplete > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-diagnosis div > div > .el-autocomplete > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-diagnosis div > div > .el-autocomplete > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    // await ptProfilePage.type('#pane-diagnosis div > div > .el-autocomplete > .el-input > .el-input__inner','ADHD');
    await ptProfilePage.keyboard.press('ArrowDown');
    await ptProfilePage.keyboard.press('Enter');

    //Assessment
    await ptProfilePage.waitForSelector('#pane-diagnosis div > div > #assessment > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-diagnosis div > div > #assessment > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-diagnosis div > div > #assessment > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-diagnosis div > div > #assessment > .v-tribute > .el-textarea__inner','addAsmnt');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(2) > div > div > span:nth-child(2)')
      
    element = await ptProfilePage.waitForSelector('div > div:nth-child(2) > div > div > span:nth-child(2)')
    await expect(element).toMatch('Saved successfully')
  }, timeout);

  //======================================== Discontinue Assessment & Diagnosis skill ===========================================
  test('Discontinue Assessment & Diagnosis skill', async () => {
    await ptProfilePage.waitForSelector('.A4 > div > div:nth-child(2) > div > div > b');
    await ptProfilePage.click('.A4 > div > div:nth-child(2) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    await ptProfilePage.waitForSelector('#pane-diagnosis .el-card__body > div > div > div:nth-child(4) > .el-button > span')
    await ptProfilePage.click('#pane-diagnosis .el-card__body > div > div > div:nth-child(4) > .el-button > span')
    await ptProfilePage.waitForTimeout(500);

    await ptProfilePage.waitForSelector('.el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner')
    await ptProfilePage.click('.el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner')

    await ptProfilePage.evaluate(function() {
      document.querySelector('.el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('.el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner','Not Required');

    await ptProfilePage.waitForSelector('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await ptProfilePage.click('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await ptProfilePage.waitForTimeout(500);

    element = await ptProfilePage.waitForSelector('.el-popup-parent--hidden > .el-message > .el-message__content')
    await expect(element).toMatch('diagnosis deleted.')
  }, timeout);

});
afterAll(async done => {
  done();
});