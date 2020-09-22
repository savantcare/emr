const timeout = process.env.SLOWMO ? 30000 : 30000;
const {
  gatherPerformanceTimingMetric,
  gatherPerformanceTimingMetrics,
  processPerformanceTimingMetrics,
} = require("@/reminder/helper");

beforeAll(async () => {
  await page.goto(URL, { waitUntil: "domcontentloaded" }); // Goto the patient file link and wait for loading
});

describe("Test header and title of the page", () => {
  /**
   * addText == Use for add the value on Click Single and Multiple Addition
   * changeText == Use for change the value on click Single and Multiple Change
   * foundExitTr == Count total rows and store the value into it
   *
   */
  let searchText, element, foundExitTr;
  const addText = "test";
  const changeText = "test1";

  test(
    "Title of the page",
    async () => {
      const title = await page.title();
      await expect(title).toBe("patient-file"); //Expect Title of the page
    },
    timeout
  );

  test(
    "Test Start for Reminder",
    async () => {
      await page.waitForSelector(
        "div:nth-child(1) > .el-card > .el-card__header > .clearfix > span"
      );
      await page.click(
        "div:nth-child(1) > .el-card > .el-card__header > .clearfix > span"
      );

      element = await page.waitForSelector(
        "div:nth-child(1) > .el-card > .el-card__header > .clearfix > span"
      );

      await expect(element).toMatch("Reminders"); //Expect Reminder name
    },
    timeout
  );

  test(
    "Test for Single Add",
    async () => {
      await page.waitForSelector(
        ".el-card:nth-child(2) > .el-card__header > .clearfix > .el-button-group > .el-button--success > span"
      );
      await page.click(
        ".el-card:nth-child(2) > .el-card__header > .clearfix > .el-button-group > .el-button--success > span"
      ); // Click on add icon

      await page.waitForSelector(
        ".el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      );
      await page.click(
        ".el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      ); // Click the area for input the text
      await page.type(
        ".el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner",
        addText
      ); // Type the text for add

      await page.waitFor(1000);
      await page.waitForSelector(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(1) > span"
      );
      await page.click(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(1) > span"
      ); // Click on submit button

      await page.waitFor(1000);
      await page.waitForSelector(
        ".el-table__header > .has-gutter > tr > .el-table_2_column_5 > .cell"
      );
      element = await page.waitForSelector(
        ".el-table__header > .has-gutter > tr > .el-table_2_column_5 > .cell"
      );
      await expect(element).toMatch("Reminders added this session"); //Expect the message for Addition

      await page.waitFor(1000);
      await page.keyboard.press(`Escape`); // Close the Add Popup
    },
    timeout
  );

  test(
    "Test for Single Delete",
    async () => {
      foundExitTr = await page.evaluate(() => {
        const tds = Array.from(
          document.querySelectorAll(
            ".el-table__body > tbody > .el-table__row > .el-table_1_column_3 > .cell"
          )
        );
        let returnstatus = 0;
        let childNode = 1;
        tds.map((td) => {
          if (td.textContent) {
            returnstatus = childNode;
          }
          childNode++;
        });
        return returnstatus;
      });

      for (let i = 1; i <= foundExitTr; i++) {
        await page.waitForSelector(
          ".el-table__body > tbody > .el-table__row:nth-child(" +
            i +
            ") > .el-table_1_column_3> .cell"
        );
        element = await page.waitForSelector(
          ".el-table__body > tbody > .el-table__row:nth-child(" +
            i +
            ") > .el-table_1_column_3 > .cell"
        );
        searchText = await page.evaluate(
          (element) => element.textContent,
          element
        );
        searchText = searchText.trim();

        if (searchText == addText) {
          await page.waitForSelector(
            ".el-table__row:nth-child(" +
              i +
              ") > .el-table_1_column_4 > .cell > .el-button-group > .el-button--warning > span"
          );
          await page.click(
            ".el-table__row:nth-child(" +
              i +
              ") > .el-table_1_column_4 > .cell > .el-button-group > .el-button--warning > span"
          ); // Click on Delete Icon

          await page.waitForSelector(
            ".el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner"
          );
          await page.click(
            ".el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner"
          ); // Click the area for input the text
          await page.type(
            ".el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner",
            "N"
          ); // Enter text for Delete (Optional)

          await page.waitFor(500);
          await page.waitForSelector(
            ".el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span"
          );
          await page.click(
            ".el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span"
          ); // Click on Delete button for Delete the data

          break;
        }
      }
    },
    timeout
  );

  test(
    "Test for Reset and Remove button on Add Icon",
    async () => {
      await page.waitForSelector(
        ".el-card:nth-child(2) > .el-card__header > .clearfix > .el-button-group > .el-button--success > span"
      );
      await page.click(
        ".el-card:nth-child(2) > .el-card__header > .clearfix > .el-button-group > .el-button--success > span"
      ); // Click on add icon

      await page.waitForSelector(
        ".el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      );
      await page.click(
        ".el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      ); // Click the area for input the text
      await page.type(
        ".el-form-item > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner",
        addText
      ); // Type the text for add

      await page.waitForSelector(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(2) > span"
      );
      await page.click(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(2) > span"
      ); // Click on Add more button

      await page.waitForSelector(
        ".el-form-item:nth-child(2) > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      );
      await page.click(
        ".el-form-item:nth-child(2) > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      ); // Click the area for input the text
      await page.type(
        ".el-form-item:nth-child(2) > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner",
        addText
      ); // Type the text for add

      await page.waitForSelector(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(2) > span"
      );
      await page.click(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(2) > span"
      ); // Click on Add more button

      await page.waitForSelector(
        ".el-form-item:nth-child(3) > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      );
      await page.click(
        ".el-form-item:nth-child(3) > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner"
      ); // Click the area for input the text
      await page.type(
        ".el-form-item:nth-child(3) > .el-form-item__content > .el-col > .el-textarea > .el-textarea__inner",
        addText
      ); // Type the text for add

      await page.waitFor(500);

      await page.waitForSelector(
        ".el-form-item:nth-child(3) > .el-form-item__content > .el-col > .el-button > span"
      );
      await page.click(
        ".el-form-item:nth-child(3) > .el-form-item__content > .el-col > .el-button > span"
      ); // Click on Remove button For remove the row from form

      await page.waitFor(500);

      await page.waitForSelector(
        ".el-form > .el-form-item > .el-form-item__content > .el-button--warning > span"
      );
      await page.click(
        ".el-form > .el-form-item > .el-form-item__content > .el-button--warning > span"
      ); // Click on Reset button for reset the form value

      await page.keyboard.press(`Escape`);

      await getPerformanceTime("Addition");
    },
    timeout
  );

  async function getPerformanceTime(test) {
    const rawMetrics = await gatherPerformanceTimingMetrics(page);
    const metrics = await processPerformanceTimingMetrics(rawMetrics);
    // console.log(`Req: ${metrics.request}`)
    // console.log(`Res: ${metrics.response}`)
    // console.log(`DOM load: ${metrics.domLoaded}`)
    // console.log(`DOM interactive: ${metrics.domInteractive}`)
    // console.log(`Document load: ${metrics.pageLoad}`)
    console.log(`Full load time for ` + test + `: ${metrics.fullTime}`);

    // const loadEventEnd = await gatherPerformanceTimingMetric(page, 'loadEventEnd')
    // const date = new Date(loadEventEnd)
    // console.log(`Page load ended on: ${date}`)
  }
});
