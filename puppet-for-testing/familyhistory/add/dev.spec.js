const { loginP20 } = require("../../login.js");

const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  jest.setTimeout(10000);
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test header and title of the page", () => {
  let profilePage, patientProfile;

  test(
    "Title of the page and Login",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
      await page.waitFor(1000);
      await loginP20(page);
      await page.waitFor(1000);
    },
    timeout
  );
  test('add family history', async () => {
    await page.waitFor(1000);
    profilePage = new Promise(x => browser.once('targetcreated', target => x(target.page())));

    await page.waitForSelector('div > .container > div > div > .button--blue')
    await page.click('div > .container > div > div > .button--blue')
    await page.waitFor(1000);
    patientProfile = await profilePage;

    await patientProfile.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.waitFor(500);

    await patientProfile.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(8) > div > div:nth-child(1)')
    await patientProfile.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(8) > div > div:nth-child(1)')
    await patientProfile.waitFor(2000);
    
    await patientProfile.waitForSelector('div > div > #relationship > .v-tribute > .el-input__inner')
    await patientProfile.click('div > div > #relationship > .v-tribute > .el-input__inner')

    await patientProfile.type('div > div > #relationship > .v-tribute > .el-input__inner','test')
    await patientProfile.waitFor(500);

    await patientProfile.waitForSelector('div > div > #description > .v-tribute > .valid-dirty-data')
    await patientProfile.click('div > div > #description > .v-tribute > .valid-dirty-data')
    await patientProfile.type('div > div > #description > .v-tribute > .valid-dirty-data','test2')
    await patientProfile.waitFor(1000);

    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitFor(500);

    await patientProfile.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.click('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.waitFor(400);

    element = await patientProfile.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(8) > div > div:nth-child(1)')
    await expect(element).toMatch('Saved successfully')


  }, timeout);

  test('Delete family history', async () => {
    await patientProfile.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(8) > div > div > b')
    await patientProfile.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(8) > div > div > b')
    
    await patientProfile.waitForSelector('.el-card__body > div > div > div > .el-button > span')
    await patientProfile.click('.el-card__body > div > div > div > .el-button > span')
    
    await patientProfile.waitForSelector('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.click('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
  }, timeout);
  

});
afterAll(async done => {
  done();
});