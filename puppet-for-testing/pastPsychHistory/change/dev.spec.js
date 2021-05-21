const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Past Psych History for Addition", () => {
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

  //======================================== Change Past Psych History skill ===========================================
  test('Change Past Psych History skill', async () => {
    await ptProfilePage.waitForSelector('div > div > div > .A4 > div > div:nth-child(7) > div > div > b');
    await ptProfilePage.click('div > div > div > .A4 > div > div:nth-child(7) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    // Past outpatient treatment
    await ptProfilePage.waitForSelector('#pane-past_psych_history div > div > #past_outpatient_treatment > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-past_psych_history div > div > #past_outpatient_treatment > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-past_psych_history div > div > #past_outpatient_treatment > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-past_psych_history div > div > #past_outpatient_treatment > .v-tribute > .el-textarea__inner','changePastOT');

    // Past meds trials
    await ptProfilePage.waitForSelector('#pane-past_psych_history div > div > #past_meds_trials > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-past_psych_history div > div > #past_meds_trials > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-past_psych_history div > div > #past_meds_trials > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-past_psych_history div > div > #past_meds_trials > .v-tribute > .el-textarea__inner','changePastMT');

    // Hospitalization
    await ptProfilePage.waitForSelector('#pane-past_psych_history div > div > #hospitalization > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-past_psych_history div > div > #hospitalization > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-past_psych_history div > div > #hospitalization > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-past_psych_history div > div > #hospitalization > .v-tribute > .el-textarea__inner','changeHosp');

    // History of violence
    await ptProfilePage.waitForSelector('div > div > #history_of_violence > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('div > div > #history_of_violence > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('div > div > #history_of_violence > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('div > div > #history_of_violence > .v-tribute > .el-textarea__inner','changeHistVio');

    // History of self harm
    await ptProfilePage.waitForSelector('#pane-past_psych_history div > div > #history_of_self_harm > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-past_psych_history div > div > #history_of_self_harm > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-past_psych_history div > div > #history_of_self_harm > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-past_psych_history div > div > #history_of_self_harm > .v-tribute > .el-textarea__inner','changeHistSelfHarm');

    // Past substance abuse
    await ptProfilePage.waitForSelector('#pane-past_psych_history div > div > #past_substance_abuse > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-past_psych_history div > div > #past_substance_abuse > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-past_psych_history div > div > #past_substance_abuse > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-past_psych_history div > div > #past_substance_abuse > .v-tribute > .el-textarea__inner','changePastSubAbuse');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(7) > div > div > span:nth-child(2)')
    
    element = await ptProfilePage.waitForSelector('div > div:nth-child(7) > div > div > span:nth-child(2)')
    await expect(element).toMatch('Saved successfully')
  }, timeout);

});
afterAll(async done => {
  done();
});