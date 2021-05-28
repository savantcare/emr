const { loginP20 } = require("../login.js");

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
 test('Change the Blood Sugar skill', async () => {
    await page.waitForTimeout(500);
    await patientProfile.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(2) > div:nth-child(1) > div > div > div > b')
    await patientProfile.click('div:nth-child(2) > div:nth-child(1) > div > div > div > b')
    await patientProfile.waitForTimeout(200);

    await patientProfile.waitForSelector('div > #bloodSugarMgDL > .el-input-number > .el-input-number__increase > .el-icon-plus')
    await patientProfile.click('div > #bloodSugarMgDL > .el-input-number > .el-input-number__increase > .el-icon-plus')
    await patientProfile.waitForTimeout(200);
    
    await patientProfile.waitForSelector('div > #bloodSugarMgDL > .el-input-number > .el-input-number__increase > .el-icon-plus')
    await patientProfile.click('div > #bloodSugarMgDL > .el-input-number > .el-input-number__increase > .el-icon-plus')
    await patientProfile.waitForTimeout(200);
    
    let num = 'test'+Math.floor(Math.random() * 100);

    if (await patientProfile.$('#each-data-row-0-blood_sugar > div > div > #notes > .v-tribute > .el-textarea__inner') !== null) 
    {
      await patientProfile.waitForSelector('#each-data-row-0-blood_sugar > div > div > #notes > .v-tribute > .el-textarea__inner')
      await patientProfile.click('#each-data-row-0-blood_sugar > div > div > #notes > .v-tribute > .el-textarea__inner')

      await patientProfile.evaluate(function() {
        document.querySelector('#each-data-row-0-blood_sugar > div > div > #notes > .v-tribute > .el-textarea__inner').value = '';
      })
      await patientProfile.waitForTimeout(200);
      await patientProfile.type('#each-data-row-0-blood_sugar > div > div > #notes > .v-tribute > .el-textarea__inner',num);
      await patientProfile.waitForTimeout(500);
    }
    else
    {
      await patientProfile.waitForSelector('div:nth-child(6) > div > .el-col > div > div > div > div > #notes > .v-tribute > .el-textarea__inner')
      await patientProfile.click('div:nth-child(6) > div > .el-col > div > div > div > div > #notes > .v-tribute > .el-textarea__inner')

      await patientProfile.evaluate(function() {
        document.querySelector('div:nth-child(6) > div > .el-col > div > div > div > div > #notes > .v-tribute > .el-textarea__inner').value = '';
      })
      await patientProfile.waitForTimeout(200);
      await patientProfile.type('div:nth-child(6) > div > .el-col > div > div > div > div > #notes > .v-tribute > .el-textarea__inner',num);
      await patientProfile.waitForTimeout(500);
    }

    if (await patientProfile.$('#each-data-row-0-blood_sugar > div > div > div > .el-date-editor > .el-input__inner') !== null)
    {
      await patientProfile.waitForSelector('#each-data-row-0-blood_sugar > div > div > div > .el-date-editor > .el-input__inner')
      await patientProfile.click('#each-data-row-0-blood_sugar > div > div > div > .el-date-editor > .el-input__inner')
      await patientProfile.waitForTimeout(500);
      
      await patientProfile.waitForSelector('tbody > .el-date-table__row:nth-child(4) > .available:nth-child(5) > div > span')

      await patientProfile.click('tbody > .el-date-table__row:nth-child(4) > .available:nth-child(5) > div > span')
    }
    else
    {
      await patientProfile.waitForSelector('div:nth-child(6) > div > .el-col > div > div > div > div > .el-date-editor > .el-input__inner')
      await patientProfile.click('div:nth-child(6) > div > .el-col > div > div > div > div > .el-date-editor > .el-input__inner')
      await patientProfile.waitForTimeout(500);
      
      await patientProfile.waitForSelector('tbody > .el-date-table__row:nth-child(4) > .available:nth-child(5) > div > span')

      await patientProfile.click('tbody > .el-date-table__row:nth-child(4) > .available:nth-child(5) > div > span')
    }
  }, timeout);

  
  test('Save Blood Sugar component',async()=>{
    await patientProfile.waitForTimeout(500);
    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.click('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.waitForTimeout(1000);

    element = await patientProfile.waitForSelector('div:nth-child(4) > div > div > div:nth-child(1) > span')
    await expect(element).toMatch('Saved successfully')
},timeout)

});
afterAll(async done => {
  done();
});