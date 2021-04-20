async function loginP20(page){
    await page.waitFor(1000);
    detailPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    await page.waitForSelector('#\__layout #g_id_onload');
    await page.click('#\__layout #g_id_onload');
    googleOAuthPage = await detailPagePromise;
    await googleOAuthPage.setViewport({
      width: 700,
      height: 600
    })
    await googleOAuthPage.waitFor(1000);
    await googleOAuthPage.waitForSelector('input[type="email"]')
    await googleOAuthPage.click('input[type="email"]')
    
    await googleOAuthPage.type('input[type="email"]','doctortest94@gmail.com');
   
    await googleOAuthPage.click('#identifierNext')
    await googleOAuthPage.waitFor(1000);
    await googleOAuthPage.waitForSelector('input[type="password"]',{ visible: true })
    await googleOAuthPage.type('input[type="password"]','jaikalima');
    await googleOAuthPage.click('#passwordNext')
    await page.waitFor(3000);
    getEmail = await page.waitForSelector('div > .container > div > div > h2')
    await expect(getEmail).toMatch('Your Email id: doctortest94@gmail.com')
}

module.exports = { loginP20 };