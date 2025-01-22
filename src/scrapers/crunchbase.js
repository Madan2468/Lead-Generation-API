const puppeteer = require("puppeteer");
const logger = require("../utils/logger");

async function scrapeCrunchBase() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        logger.info("Navigating to CrunchBase...");
        await page.goto("https://www.crunchbase.com/", { waitUntil: "networkidle2", timeout: 30000 });

        logger.info("Waiting for the page to load...");
        await page.waitForSelector("body", { timeout: 30000 });

        logger.info("Page loaded successfully, starting extraction...");

        // Extracting all visible text elements to find patterns
        const pageContent = await page.evaluate(() => {
            const elements = Array.from(document.body.getElementsByTagName("*"));
            return elements
                .filter(el => {
                    // Only include visible elements
                    const style = window.getComputedStyle(el);
                    return style.display !== "none" && style.visibility !== "hidden";
                })
                .map(el => ({
                    tag: el.tagName,
                    class: el.className,
                    text: el.innerText.trim(),
                }))
                .filter(el => el.text.length > 0); // Only include non-empty text
        });

        // Log first 10 items to inspect
        logger.info("Extracted text from page:", pageContent.slice(0, 10));

        // Search through the content for likely company names and other relevant info
        const companies = pageContent.filter(el => el.text.includes("Inc.") || el.text.includes("LLC") || el.text.includes("Corp."));

        // If we found some "company-like" data, assume they are relevant
        logger.info(`Found ${companies.length} potential company entries.`);

        // Example to show how you can process extracted data (like company name, emails, etc.)
        const companyDetails = companies.map(company => ({
            name: company.text,
            class: company.class,
            tag: company.tag,
        }));

        logger.info(`Scraped ${companyDetails.length} potential companies.`);
        return companyDetails;
    } catch (error) {
        logger.error(`Error scraping CrunchBase: ${error.message}`);
        return [];
    } finally {
        logger.info("Browser closed.");
        await browser.close();
    }
}

module.exports = scrapeCrunchBase;
