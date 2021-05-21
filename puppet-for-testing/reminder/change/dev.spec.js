const { loginP20 } = require("../../login");

const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test header and title of the page", () => {
  let profilePage, element, patientProfile;

  test(
    "Title of the page and Login",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
      await page.waitFor(1000);
      await loginP20(page);
      await page.waitFor(1000);
      profilePage = new Promise(x => browser.once('targetcreated', target => x(target.page())));

      await page.waitForSelector('div > .container > div > div > .button--blue')
      await page.click('div > .container > div > div > .button--blue')
      await page.waitFor(500);
      patientProfile = await profilePage;
    },
    timeout
  );
  test('Add reminder skill', async () => {
    
    await patientProfile.waitForSelector('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.click('.el-card > .el-card__body > div > .el-button > .el-icon-circle-close')
    await patientProfile.waitFor(500);

    // ============================== Add Reminder =================================== //
    apptDate = await patientProfile.waitForSelector('div > div > .A4 > div > b')
    await expect(apptDate).toMatch('Appt Date')
    await patientProfile.waitFor(500);

    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.waitFor(500);
    await patientProfile.waitForSelector('#pane-reminders div > div> textarea')
    await patientProfile.click('#pane-reminders div > div> textarea')
    
    await patientProfile.waitFor(500);

    await patientProfile.type('#pane-reminders div > div> textarea','test')
    await patientProfile.waitFor(500);

    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitFor(1000);

    await patientProfile.waitForSelector('#layer1RightSide > div > div > div:nth-child(1) > div:nth-child(5) > div > div > button > span')
    await patientProfile.click('#layer1RightSide > div > div > div:nth-child(1) > div:nth-child(5) > div > div > button > span')
    await patientProfile.waitFor(1000);
    
    element = await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div:nth-child(1)')
    
    await expect(element).toMatch('Saved successfully')

    // ============================== Add Reminder =================================== //

  }, timeout);
  
  test('Edit reminder skill', async () => {
    await patientProfile.waitFor(1000);
    // ============================== Edit Reminder =================================== //
    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    
    await patientProfile.waitForSelector('.el-card__body > div > div > div:nth-child(1) > div > #description > .v-tribute > .el-textarea__inner')
    await patientProfile.click('.el-card__body > div > div > div:nth-child(1) > div > #description > .v-tribute > .el-textarea__inner')
    await patientProfile.evaluate(function() {
        document.querySelector('.el-card__body > div > div > div:nth-child(1) > div > #description > .v-tribute > .el-textarea__inner').value = ''
    })

    await patientProfile.type('.el-card__body > div > div > div:nth-child(1) > div > #description > .v-tribute > .el-textarea__inner','test213')
  
    await patientProfile.waitFor(500)

    await patientProfile.keyboard.press('Escape');
    await patientProfile.waitFor(1000);

    await patientProfile.waitForSelector('#layer1RightSide > div > div > div:nth-child(1) > div:nth-child(5) > div > div > button > span')
    await patientProfile.click('#layer1RightSide > div > div > div:nth-child(1) > div:nth-child(5) > div > div > button > span')
    await patientProfile.waitFor(500);
    editEliment = await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div:nth-child(1)')
    await expect(editEliment).toMatch('Saved successfully')
    // ============================== Edit Reminder =================================== //    
  }, timeout);

  test('Delete reminder skill', async () => {
    await patientProfile.waitFor(500);

    await patientProfile.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    await patientProfile.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(7) > div > div > b')
    
    await patientProfile.waitForSelector('div:nth-child(1) > .el-card > .el-card__body > div > div > div:nth-child(2) > .el-button > span')
    await patientProfile.click('div:nth-child(1) > .el-card > .el-card__body > div > div > div:nth-child(2) > .el-button > span')
    
    await patientProfile.waitForSelector('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.click('.el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span')
    await patientProfile.waitFor(500);
    deleteMsg = await patientProfile.waitForSelector('.el-popup-parent--hidden > .el-message > .el-message__content')
    await expect(deleteMsg).toMatch('reminder deleted.')

  }, timeout);
  

});
afterAll(async done => {
  done();
});