const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Medical Review Of System for Addition", () => {
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

  //======================================== Change Medical Review Of System skill ===========================================
  test('Change Medical Review Of System skill', async () => {
    await ptProfilePage.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(11) > div > div > b');
    await ptProfilePage.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(11) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    //Constitutional systems
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #constitutional_systems_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #constitutional_systems_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #constitutional_systems_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #constitutional_systems_select1 > .el-button > span > span');

    // Skin conditions
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #skin_conditions_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #skin_conditions_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #skin_conditions_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #skin_conditions_select1 > .el-button > span > span');
    
    // Allergies
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #allergies_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #allergies_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #allergies_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #allergies_select1 > .el-button > span > span');
    
    // Ears/Nose/Mouth Throat
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #ear_nose_mouth_throat_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #ear_nose_mouth_throat_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #ear_nose_mouth_throat_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #ear_nose_mouth_throat_select1 > .el-button > span > span');
    
    // Eyes/Head
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #eyes_head_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #eyes_head_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #eyes_head_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #eyes_head_select1 > .el-button > span > span');

    // Respiratory
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #respiratory_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #respiratory_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #respiratory_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #respiratory_select1 > .el-button > span > span');

    // Cardiovascular
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system div > #div-containing-all-buttons > #div-containing-one-button > #cardiovascular_select0 > .el-button');
    await ptProfilePage.click('#pane-medical_review_of_system div > #div-containing-all-buttons > #div-containing-one-button > #cardiovascular_select0 > .el-button');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system div > #div-containing-all-buttons > #div-containing-one-button > #cardiovascular_select1 > .el-button');
    await ptProfilePage.click('#pane-medical_review_of_system div > #div-containing-all-buttons > #div-containing-one-button > #cardiovascular_select1 > .el-button');

    // Gastrointestinal
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #gastrointestinal_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #gastrointestinal_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #gastrointestinal_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #gastrointestinal_select1 > .el-button > span > span');

    // Urinary
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #urinary_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #urinary_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #urinary_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #urinary_select1 > .el-button > span > span');

    // Endocrine
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #endocrine_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #endocrine_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #endocrine_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #endocrine_select1 > .el-button > span > span');

    // Musculoskeletal
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #musculoskeletal_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #musculoskeletal_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #musculoskeletal_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #musculoskeletal_select1 > .el-button > span > span');

    // Neurological
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #neurological_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #neurological_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #neurological_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #neurological_select1 > .el-button > span > span');

    // Psychological
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #psychological_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #psychological_select0 > .el-button > span > span');

    // Heme/Lymphatic
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #heme_lymphatic_select0 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #heme_lymphatic_select0 > .el-button > span > span');

    await ptProfilePage.waitForSelector('#pane-medical_review_of_system #div-containing-one-button > #heme_lymphatic_select1 > .el-button > span > span');
    await ptProfilePage.click('#pane-medical_review_of_system #div-containing-one-button > #heme_lymphatic_select1 > .el-button > span > span');

    // Other signs, symptoms or problems
    await ptProfilePage.waitForSelector('#pane-medical_review_of_system div > div > #any_other_signs_symptoms > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-medical_review_of_system div > div > #any_other_signs_symptoms > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medical_review_of_system div > div > #any_other_signs_symptoms > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medical_review_of_system div > div > #any_other_signs_symptoms > .v-tribute > .el-textarea__inner','changeSign');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(11) > div > div > span:nth-child(2)')
      
    element = await ptProfilePage.waitForSelector('div > div:nth-child(11) > div > div > span:nth-child(2)')
    await expect(element).toMatch('Saved successfully')
  }, timeout);

});
afterAll(async done => {
  done();
});