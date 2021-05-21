const { loginP20 } = require("../../login");

const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test header and title of the page", () => {
  let searchText, element, foundExitTr;
  const addText = "test";
  const changeText = "test1";

  test(
    "Title of the page and Login",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
      await page.waitForTimeout(1000);
      await loginP20(page);
      await page.waitForTimeout(2000);
    },
    timeout
  );
  test('multi add reminder skill', async () => {
    await page.waitForTimeout(1000);
    profilePage = new Promise(x => browser.once('targetcreated', target => x(target.page())));

    await page.waitForSelector('div > .container > div > div > .button--blue')
    await page.click('div > .container > div > div > .button--blue')
    await page.waitForTimeout(1000);
    patientProfile = await profilePage;

    await patientProfile.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.waitForTimeout(1000);

    // ============================== Add Reminder =================================== //
    apptDate = await patientProfile.waitForSelector('div > div > .A4 > div > b')
    await expect(apptDate).toMatch('Appt Date')
    await patientProfile.waitForTimeout(500);

    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.waitForTimeout(500);
    await patientProfile.waitForSelector('#pane-reminders div > div> textarea')
    await patientProfile.click('#pane-reminders div > div> textarea')
    
    await patientProfile.waitForTimeout(500);

    await patientProfile.type('#pane-reminders div > div> textarea','test')
    await patientProfile.waitForTimeout(1000);

    await patientProfile.waitForSelector('#each-data-row-1-reminders > div > div > #description > .v-tribute > textarea')
    await patientProfile.click('#each-data-row-1-reminders > div > div > #description > .v-tribute > textarea')

    await patientProfile.waitForTimeout(500);

    await patientProfile.type('#each-data-row-1-reminders > div > div > #description > .v-tribute > textarea','test2')

    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitForTimeout(2000);

    await patientProfile.waitForSelector('#layer1RightSide > div > div > div:nth-child(1) > div:nth-child(5) > div > div > button > span')
    await patientProfile.click('#layer1RightSide > div > div > div:nth-child(1) > div:nth-child(5) > div > div > button > span')
    await patientProfile.waitForTimeout(1000);
    
    multiaddElement = await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div:nth-child(1)')
    await expect(multiaddElement).toMatch('Saved successfully')

    // ============================== Add Reminder =================================== //

  }, timeout);


  test('multi delete reminder skill', async () => {
    await patientProfile.waitForTimeout(500);
    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.waitForSelector('div:nth-child(1) > .el-card > .el-card__body > div > div > div:nth-child(2) > .el-button > span')
    await patientProfile.click('div:nth-child(1) > .el-card > .el-card__body > div > div > div:nth-child(2) > .el-button > span')
    
    await patientProfile.waitForSelector('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.click('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    
    await patientProfile.waitForSelector('div:nth-child(1) > .el-card > .el-card__body > div > div > div:nth-child(2) > .el-button > span')
    await patientProfile.click('div:nth-child(1) > .el-card > .el-card__body > div > div > div:nth-child(2) > .el-button > span')
    
    await patientProfile.waitForSelector('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.click('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.waitForTimeout(500);
    
    deleteMsg = await patientProfile.waitForSelector('.el-popup-parent--hidden > .el-message > .el-message__content')
    await expect(deleteMsg).toMatch('reminder deleted.')

  }, timeout);
  

});
afterAll(async done => {
  done();
});