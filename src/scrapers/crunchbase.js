const puppeteer = require("puppeteer");

async function scrapeCrunchBase() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.crunchbase.com/");

    // Example: Scrape data
    const companies = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".some-class")).map(el => ({
            name: el.querySelector(".name").innerText,
            email: el.querySelector(".email").innerText,
        }));
    });

    await browser.close();
    return companies;
}

module.exports = scrapeCrunchBase;
