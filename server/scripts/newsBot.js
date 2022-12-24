const puppeteer = require("puppeteer");

module.exports.getNews = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.ynet.co.il/");

  // Wait for suggest overlay to appear and click "show all results".
  const newsSelector = ".MultiArticleComponenta1280";
  await page.waitForSelector(newsSelector);

  // Extract the results from the page
  const headers = await page.evaluate(() => {
    const newsSlotsSelector = ".slotView .slotTitle.small a span ";
    return [...document.querySelectorAll(newsSlotsSelector)].map((anchor) => {
      return anchor.textContent;
    });
  });

  await browser.close();

  return headers.join("\n");
};
