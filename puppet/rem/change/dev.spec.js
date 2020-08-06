const timeout = process.env.SLOWMO ? 30000 : 10000;
const {
  gatherPerformanceTimingMetric,
  gatherPerformanceTimingMetrics,
  processPerformanceTimingMetrics,
} = require("@/rem/helper");

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
        ".el-card__header > .clearfix > .el-button-group > .el-button--success > span"
      );
      await page.click(
        ".el-card__header > .clearfix > .el-button-group > .el-button--success > span"
      );
      // Click on add icon

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

      await page.waitFor(500);
      await page.waitForSelector(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(1) > span"
      );
      await page.click(
        ".el-form > .el-form-item > .el-form-item__content > .el-button:nth-child(1) > span"
      ); // Click on submit button

      await page.waitForSelector(
        ".el-table__body > tbody > .el-table__row > .el-table_2_column_5 > .cell"
      );
      element = await page.waitForSelector(
        ".el-table__body > tbody > .el-table__row > .el-table_2_column_5 > .cell"
      );
      await expect(element).toMatch(addText); //Expect the message for Addition

      await page.keyboard.press(`Escape`); // Close the Add Popup
    },
    timeout
  );

  test(
    "Test for Single Change",
    async () => {
      foundExitTr = await page.evaluate(() => {
        const tds = Array.from(
          document.querySelectorAll(
            ".el-table__body > tbody > .el-table__row> .el-table_1_column_3 > .cell"
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
            ") > .el-table_1_column_3 > .cell"
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
              ") > .el-table_1_column_4 > .cell > .el-button-group > .el-button--primary > span"
          );
          await page.click(
            ".el-table__row:nth-child(" +
              i +
              ") > .el-table_1_column_4 > .cell > .el-button-group > .el-button--primary > span"
          ); // Click on Change Icon

          await page.waitForSelector(
            ".el-form > .el-form-item > .el-form-item__content > .el-textarea > .el-textarea__inner"
          );
          await page.evaluate(function () {
            document.querySelector(
              ".el-form > .el-form-item > .el-form-item__content > .el-textarea > .el-textarea__inner"
            ).value = "";
          }); // Clear the text area for Change text

          await page.click(
            ".el-form > .el-form-item > .el-form-item__content > .el-textarea > .el-textarea__inner"
          ); // Click the area for input the text
          await page.type(
            ".el-form > .el-form-item > .el-form-item__content > .el-textarea > .el-textarea__inner",
            changeText
          ); // Type the Change text

          await page.waitForSelector(
            ".el-form > .el-form-item > .el-form-item__content > .el-button > span"
          );
          await page.click(
            ".el-form > .el-form-item > .el-form-item__content > .el-button > span"
          ); // Click for submit the change

          await page.waitForSelector(
            ".el-timeline > .el-timeline-item > .el-timeline-item__wrapper > .el-timeline-item__content > .api-response-message"
          );
          element = await page.waitForSelector(
            ".el-timeline > .el-timeline-item > .el-timeline-item__wrapper > .el-timeline-item__content > .api-response-message"
          );
          await expect(element).toMatch("saved this session"); //Expect the message for change

          await page.keyboard.press(`Escape`); // Close the Change popup

          break;
        }
      }
    },
    timeout
  );

  test(
    "Test for Single Discontinue",
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

        if (searchText == changeText) {
          await page.waitForSelector(
            ".el-table__row:nth-child(" +
              i +
              ") > .el-table_1_column_4 > .cell > .el-button-group > .el-button--warning > span"
          );
          await page.click(
            ".el-table__row:nth-child(" +
              i +
              ") > .el-table_1_column_4 > .cell > .el-button-group > .el-button--warning > span"
          ); // Click on Discontinue Icon

          await page.waitForSelector(
            ".el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner"
          );
          await page.click(
            ".el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner"
          ); // Click the area for input the text
          await page.type(
            ".el-message-box > .el-message-box__content > .el-message-box__input > .el-input > .el-input__inner",
            "N"
          ); // Enter text for Discontinue (Optional)

          await page.waitForSelector(
            ".el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span"
          );
          await page.click(
            ".el-message-box__wrapper > .el-message-box > .el-message-box__btns > .el-button--primary > span"
          ); // Click on Discontinue button for Discontinue the data

          break;
        }
      }

      await getPerformanceTime("Change");
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
