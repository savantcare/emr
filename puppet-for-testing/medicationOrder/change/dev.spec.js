const { loginP20 } = require("../../login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test Medication Orders for Change", () => {
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

  //======================================== Add Medication Orders skill ===========================================
  test('Add Medication Orders skill', async () => {
    await ptProfilePage.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    // Drug name
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #drugName > .v-tribute > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #drugName > .v-tribute > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #drugName > .v-tribute > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #drugName > .v-tribute > .el-input__inner','addDrug');

    // Direction for the patient
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #directionsForPatient > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #directionsForPatient > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #directionsForPatient > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #directionsForPatient > .v-tribute > .el-textarea__inner','addPtDir');

    // Start date
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > div > .el-date-editor:nth-child(2) > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > div > .el-date-editor:nth-child(2) > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > div > .el-date-editor:nth-child(2) > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > div > .el-date-editor:nth-child(2) > .el-input__inner','23/04/2021');

    // Quantity
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #qty > .valid-dirty-data > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #qty > .valid-dirty-data > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #qty > .valid-dirty-data > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #qty > .valid-dirty-data > .el-input__inner','5');

    // Days supply
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #daysSupply > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #daysSupply > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #daysSupply > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #daysSupply > .el-input > .el-input__inner','2');

    //Number of refill
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #numberOfRefill > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #numberOfRefill > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #numberOfRefill > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #numberOfRefill > .el-input > .el-input__inner','5');

    //Dispense as written
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #dispenseAsWritten > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #dispenseAsWritten > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #dispenseAsWritten > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #dispenseAsWritten > .el-input > .el-input__inner','Dispense');

    //Notes to pharmacist
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner','pharmacist');

    //Ordering provider
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #orderingProvider > .v-tribute > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #orderingProvider > .v-tribute > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #orderingProvider > .v-tribute > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #orderingProvider > .v-tribute > .el-input__inner','Ordering');

    //Pharmacy
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div > #pharmacy > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-medication_orders div > div > #pharmacy > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div > #pharmacy > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div > #pharmacy > .v-tribute > .el-textarea__inner','Pharmacy');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(5) > div > div > span:nth-child(2)')
    
    element = await ptProfilePage.waitForSelector('div > div:nth-child(5) > div > div > span:nth-child(2)')
    await expect(element).toMatch('Saved successfully')
  }, timeout);

  //======================================== Change Medication Orders skill ===========================================
  test('Change Medication Orders skill', async () => {
    await ptProfilePage.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.waitForTimeout(500);

    // Drug name
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #drugName > .v-tribute > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #drugName > .v-tribute > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #drugName > .v-tribute > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #drugName > .v-tribute > .el-input__inner','changeDrug');

    // Direction for the patient
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #directionsForPatient > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #directionsForPatient > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #directionsForPatient > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #directionsForPatient > .v-tribute > .el-textarea__inner','changePtDir');

    // Start date
    await ptProfilePage.waitForSelector('#pane-medication_orders div > div:nth-child(3) > div > .el-date-editor > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders div > div:nth-child(3) > div > .el-date-editor > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders div > div:nth-child(3) > div > .el-date-editor > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders div > div:nth-child(3) > div > .el-date-editor > .el-input__inner','24/04/2021');

    // Quantity
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #qty > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #qty > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #qty > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #qty > .el-input > .el-input__inner','7');

    // Days supply
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #daysSupply > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #daysSupply > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #daysSupply > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #daysSupply > .el-input > .el-input__inner','5');

    //Number of refill
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #numberOfRefill > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #numberOfRefill > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #numberOfRefill > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #numberOfRefill > .el-input > .el-input__inner','7');

    //Dispense as written
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #dispenseAsWritten > .el-input > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #dispenseAsWritten > .el-input > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #dispenseAsWritten > .el-input > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #dispenseAsWritten > .el-input > .el-input__inner','ChangeDispense');

    //Notes to pharmacist
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #notesToPharmacist > .v-tribute > .el-textarea__inner','ChangePharmacist');

    //Ordering provider
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #orderingProvider > .v-tribute > .el-input__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #orderingProvider > .v-tribute > .el-input__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #orderingProvider > .v-tribute > .el-input__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #orderingProvider > .v-tribute > .el-input__inner','ChangeOrdering');

    //Pharmacy
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > div > #pharmacy > .v-tribute > .el-textarea__inner');
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > div > #pharmacy > .v-tribute > .el-textarea__inner');
    
    await ptProfilePage.evaluate(function() {
      document.querySelector('#pane-medication_orders .el-card__body > div > div > div > div > #pharmacy > .v-tribute > .el-textarea__inner').value = '';
    })
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.type('#pane-medication_orders .el-card__body > div > div > div > div > #pharmacy > .v-tribute > .el-textarea__inner','ChangePharmacy');

    await ptProfilePage.keyboard.press('Escape');

    await ptProfilePage.waitForSelector('div:nth-child(5) > div > div > .el-button > span')
    await ptProfilePage.click('div:nth-child(5) > div > div > .el-button > span')
    
    await ptProfilePage.waitForSelector('div > div:nth-child(5) > div > div > span:nth-child(2)')
    
    element = await ptProfilePage.waitForSelector('div > div:nth-child(5) > div > div > span:nth-child(2)')
    await expect(element).toMatch('Saved successfully')
  }, timeout);

  //======================================== Discontinue Medication Orders skill ===========================================
  test('Discontinue Medication Orders skill', async () => {
    await ptProfilePage.waitForSelector('div:nth-child(2) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.click('div:nth-child(2) > div > div > .A4 > div > div:nth-child(5) > div > div > b');
    await ptProfilePage.waitForTimeout(500);
    await ptProfilePage.waitForSelector('#pane-medication_orders .el-card__body > div > div > div > .el-button > span')
    await ptProfilePage.click('#pane-medication_orders .el-card__body > div > div > div > .el-button > span')
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
    await expect(element).toMatch('medication order deleted.')
  }, timeout);
  
});
afterAll(async done => {
  done();
});