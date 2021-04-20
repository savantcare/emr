const { loginP20 } = require("./puppet-for-testing/login.js");
const timeout = process.env.SLOWMO ? 30000 : 50000;

beforeAll(async () => {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test header and title of the page", () => {
  test(
    "Title of the page and Login",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
      await page.waitFor(1000);
      await loginP20(page);
      await page.waitFor(7000);
      getEmail = await page.waitForSelector('div > .container > div > div > h2')
      await expect(getEmail).toMatch('Your Email id: arijit.c@grmtech.com')
    },
    timeout
  );
  
});
afterAll(async done => {
  done();
});