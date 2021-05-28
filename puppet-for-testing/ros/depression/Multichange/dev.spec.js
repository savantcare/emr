const { loginP20 } = require("../../../login.js");

const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  jest.setTimeout(10000);
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test header and title of the page", () => {
  let profilePage, patientProfile, element;

  test(
    "Title of the page and Login",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
      await page.waitForTimeout(3000);
      await loginP20(page);
      await page.waitForTimeout(1000);
      profilePage = new Promise(x => browser.once('targetcreated', target => x(target.page())));
      await page.waitForSelector('div > .container > div > div > .button--blue')
      await page.click('div > .container > div > div > .button--blue')
      await page.waitForTimeout(1000);
      patientProfile = await profilePage;
    },
    timeout
  );

  test('Change depression', async () => {
    await page.waitForTimeout(1000);
    await patientProfile.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.waitForTimeout(500);
    
    await patientProfile.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(6) > div > div > b')
    await patientProfile.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(6) > div > div > b')
    await patientProfile.waitForTimeout(500);
    
    await patientProfile.waitForSelector('.el-tabs__header #tab-depression')
    await patientProfile.click('.el-tabs__header #tab-depression')
    await patientProfile.waitForTimeout(500);
    
    await patientProfile.waitForSelector('div:nth-child(1) > div > div > div > .slider > .vue-slider-rail')
    await patientProfile.click('div:nth-child(1) > div > div > div > .slider > .vue-slider-rail')
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(2) > div > div > div > .slider > .vue-slider-rail')
    await patientProfile.click('div:nth-child(2) > div > div > div > .slider > .vue-slider-rail')
    
  }, timeout); 

  test('Save depression', async () => {
    await patientProfile.waitForTimeout(500);

    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.click('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.waitForTimeout(500);

    element = await patientProfile.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(6) > div > div:nth-child(1)')
    await expect(element).toMatch('Saved successfully')
    
  }, timeout);

  test('Clear depression', async () => {
    await page.waitForTimeout(1000);
  
    await patientProfile.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(6) > div > div > b')
    await patientProfile.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(6) > div > div > b')
    await patientProfile.waitForTimeout(200);

    await patientProfile.waitForSelector('.el-tabs__header #tab-depression')
    await patientProfile.click('.el-tabs__header #tab-depression')
    
    await patientProfile.waitForSelector('div:nth-child(1) > div > div > div > .slider > .vue-slider-rail > .vue-slider-process')
    await patientProfile.click('div:nth-child(1) > div > div > div > .slider > .vue-slider-rail > .vue-slider-process')
    await patientProfile.waitForTimeout(200);

    await patientProfile.waitForSelector('div:nth-child(2) > div > div > div > .slider > .vue-slider-rail > .vue-slider-process')
    await patientProfile.click('div:nth-child(2) > div > div > div > .slider > .vue-slider-rail > .vue-slider-process')
    
  }, timeout);

  test('Save clear depression', async () => {
    await patientProfile.waitForTimeout(500);

    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.click('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.waitForTimeout(500);

    element = await patientProfile.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(6) > div > div:nth-child(1)')
    await expect(element).toMatch('Saved successfully')
    
  }, timeout);

});
afterAll(async done => {
  done();
});
