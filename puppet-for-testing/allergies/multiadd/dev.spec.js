const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Allergies for Addition", () => {
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

  //======================================== Add Allergies skill ======================================================
  //-------------------------------------------- First Addition -------------------------------------------------------
  test('Add Allergies skill', async () => {
    await ptProfilePage.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(12) > div > div > b');
    await ptProfilePage.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(12) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    //Present
    await ptProfilePage.waitForSelector('#pane-allergies div > #div-containing-all-buttons > #div-containing-one-button > .el-button--plain:nth-child(1) > span');
    await ptProfilePage.click('#pane-allergies div > #div-containing-all-buttons > #div-containing-one-button > .el-button--plain:nth-child(1) > span');

    isPresentValue = await ptProfilePage.waitForSelector('#pane-allergies div > #div-containing-all-buttons > #div-containing-one-button > .el-button--primary > span');
    isPresent = await ptProfilePage.evaluate(isPresentValue => isPresentValue.textContent,isPresentValue)
    
    if(isPresent == 'Yes')
    {
      // Allergen
      await ptProfilePage.waitForSelector('#pane-allergies div > div > #allergen > .v-tribute > .el-input__inner');
      await ptProfilePage.click('#pane-allergies div > div > #allergen > .v-tribute > .el-input__inner');
      
      await ptProfilePage.evaluate(function() {
        document.querySelector('#pane-allergies div > div > #allergen > .v-tribute > .el-input__inner').value = '';
      })
      await ptProfilePage.waitForTimeout(500);
      await ptProfilePage.type('#pane-allergies div > div > #allergen > .v-tribute > .el-input__inner','addAllergen');

      // Reaction
      await ptProfilePage.waitForSelector('#pane-allergies div > div > #reaction > .v-tribute > .el-input__inner');
      await ptProfilePage.click('#pane-allergies div > div > #reaction > .v-tribute > .el-input__inner');
      
      await ptProfilePage.evaluate(function() {
        document.querySelector('#pane-allergies div > div > #reaction > .v-tribute > .el-input__inner').value = '';
      })
      await ptProfilePage.waitForTimeout(500);
      await ptProfilePage.type('#pane-allergies div > div > #reaction > .v-tribute > .el-input__inner','addReaction');

      // Onset
      await ptProfilePage.waitForSelector('#pane-allergies div > div > #onset > .v-tribute > .el-input__inner');
      await ptProfilePage.click('#pane-allergies div > div > #onset > .v-tribute > .el-input__inner');
      
      await ptProfilePage.evaluate(function() {
        document.querySelector('#pane-allergies div > div > #onset > .v-tribute > .el-input__inner').value = '';
      })
      await ptProfilePage.waitForTimeout(500);
      await ptProfilePage.type('#pane-allergies div > div > #onset > .v-tribute > .el-input__inner','addOnset');
    }
  }, timeout);

  //-------------------------------------------- Second Addition -------------------------------------------------------
  test('Multi Add Allergies skill', async () => {
    if(isPresent == 'Yes')
    {
      // Allergen
      await ptProfilePage.waitForSelector('#pane-allergies #each-data-row-1-allergies > div > div > #allergen > .v-tribute > .el-input__inner');
      await ptProfilePage.click('#pane-allergies #each-data-row-1-allergies > div > div > #allergen > .v-tribute > .el-input__inner');
      
      await ptProfilePage.evaluate(function() {
        document.querySelector('#pane-allergies #each-data-row-1-allergies > div > div > #allergen > .v-tribute > .el-input__inner').value = '';
      })
      await ptProfilePage.waitForTimeout(500);
      await ptProfilePage.type('#pane-allergies #each-data-row-1-allergies > div > div > #allergen > .v-tribute > .el-input__inner','multiAddAllergen');

      // Reaction
      await ptProfilePage.waitForSelector('#pane-allergies #each-data-row-1-allergies > div > div > #reaction > .v-tribute > .el-input__inner');
      await ptProfilePage.click('#pane-allergies #each-data-row-1-allergies > div > div > #reaction > .v-tribute > .el-input__inner');
      
      await ptProfilePage.evaluate(function() {
        document.querySelector('#pane-allergies #each-data-row-1-allergies > div > div > #reaction > .v-tribute > .el-input__inner').value = '';
      })
      await ptProfilePage.waitForTimeout(500);
      await ptProfilePage.type('#pane-allergies #each-data-row-1-allergies > div > div > #reaction > .v-tribute > .el-input__inner','multiAddReaction');

      // Onset
      await ptProfilePage.waitForSelector('#pane-allergies #each-data-row-1-allergies > div > div > #onset > .v-tribute > .el-input__inner');
      await ptProfilePage.click('#pane-allergies #each-data-row-1-allergies > div > div > #onset > .v-tribute > .el-input__inner');
      
      await ptProfilePage.evaluate(function() {
        document.querySelector('#pane-allergies #each-data-row-1-allergies > div > div > #onset > .v-tribute > .el-input__inner').value = '';
      })
      await ptProfilePage.waitForTimeout(500);
      await ptProfilePage.type('#pane-allergies #each-data-row-1-allergies > div > div > #onset > .v-tribute > .el-input__inner','multiAddOnset');
    }

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    if(isPresent == 'Yes')
    {
      await ptProfilePage.waitForSelector('div > div:nth-child(12) > div > div > span:nth-child(2)')
      
      element = await ptProfilePage.waitForSelector('div > div:nth-child(12) > div > div > span:nth-child(2)')
      await expect(element).toMatch('Saved successfully')
    }
  }, timeout);

  //======================================== Discontinue Allergies skill =================================================
  test('Discontinue Allergies skill', async () => {
    await ptProfilePage.waitForSelector('div:nth-child(3) > div > div > .A4 > div > div:nth-child(12) > div > div > b');
    await ptProfilePage.click('div:nth-child(3) > div > div > .A4 > div > div:nth-child(12) > div > div > b');
    await ptProfilePage.waitForTimeout(500);
    if(isPresent == 'Yes')
    {
      await ptProfilePage.waitForSelector('#pane-allergies .el-card__body > div > div > div:nth-child(4) > .el-button > span')
      await ptProfilePage.click('#pane-allergies .el-card__body > div > div > div:nth-child(4) > .el-button > span')
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
      await expect(element).toMatch('allergy deleted.');

      await ptProfilePage.waitForSelector('#pane-allergies .el-card__body > div > div > div:nth-child(4) > .el-button > span')
      await ptProfilePage.click('#pane-allergies .el-card__body > div > div > div:nth-child(4) > .el-button > span')
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
      await expect(element).toMatch('allergy deleted.');
    }
  }, timeout);
  
});
afterAll(async done => {
  done();
});