const { loginP20 } = require("../../login.js");

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
  test('check filter section skill', async () => {
    await page.waitForTimeout(500);
    await patientProfile.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.waitForTimeout(200);
    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(9) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(9) > div > div > b')
    await patientProfile.waitForTimeout(200);

    // await patientProfile.waitForSelector('#pane-service_statements > div > div > div > .el-input > .el-input__inner')
    // await patientProfile.click('#pane-service_statements > div > div > div > .el-input > .el-input__inner')
    // await patientProfile.waitForTimeout(200);

    // await patientProfile.type('#pane-service_statements > div > div > div > .el-input > .el-input__inner','CBT');
    // await patientProfile.waitForTimeout(500);
    // let element = await patientProfile.$('#modality_of_psychotherapy_multi_select2 > .el-button > span > span > b')
    // let value = await patientProfile.evaluate(element => element.textContent, element)
    // await expect(value).toMatch('CBT')
    // await patientProfile.waitForTimeout(200);

    // await patientProfile.waitForSelector('#pane-service_statements > div > div > div > .el-input > .el-input__inner')
    // await patientProfile.click('#pane-service_statements > div > div > div > .el-input > .el-input__inner')
    // await patientProfile.waitForTimeout(200);

    // await patientProfile.evaluate(function() {
    //   document.querySelector('#pane-service_statements > div > div > div > .el-input > .el-input__inner').value = '';
    // })

  }, timeout);

  test('change service statement skill', async () => {
    await patientProfile.waitForTimeout(1000);
    await patientProfile.waitForSelector('div > div > #total_minutes_in_psychotherapy > .el-input-number > .el-input-number__increase')
    await patientProfile.click('div > div > #total_minutes_in_psychotherapy > .el-input-number > .el-input-number__increase')
    
    await patientProfile.waitForSelector('div > div > #total_minutes_with_patient > .el-input-number > .el-input-number__increase')
    await patientProfile.click('div > div > #total_minutes_with_patient > .el-input-number > .el-input-number__increase')

    await patientProfile.waitForSelector('#pane-service_statements > div >div>div:nth-child(2)>div:nth-child(3) #div-containing-all-buttons >div:nth-child(2)>button')
    await patientProfile.click('#pane-service_statements > div >div>div:nth-child(2)>div:nth-child(3) #div-containing-all-buttons >div:nth-child(2)>button')
  }, timeout);

  test('Save service statement component',async()=>{
    await patientProfile.waitForTimeout(500);
    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.click('div:nth-child(5) > div > div > .el-button > span')
    await patientProfile.waitForTimeout(500);

    element = await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(9) > div > div:nth-child(1)')
    await expect(element).toMatch('Saved successfully')
},timeout)

});
afterAll(async done => {
  done();
});