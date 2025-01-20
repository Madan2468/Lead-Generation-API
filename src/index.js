require('dotenv').config();

const connectDB = require("./utils/db");
const scrapeCrunchBase = require("./scrapers/crunchbase");
const enrichWithSEO = require("./enrichers/seo");
const { startDashboard, progressMetrics } = require("./services/dashboard");
const sendUpdate = require("./services/bot");
const logger = require("./utils/logger");

(async function main() {
    connectDB();
    startDashboard(); // Start the dashboard server

    try {
        logger.info("Starting data scraping...");
        sendUpdate("Pipeline started: Scraping data...");

        const data = await scrapeCrunchBase();
        progressMetrics.totalLeadsScraped = data.length;

        logger.info("Enriching data...");
        sendUpdate(`Scraped ${data.length} leads. Starting enrichment...`);

        const enrichedData = await Promise.all(data.map(async (entry) => {
            const seoData = await enrichWithSEO(entry.website);
            progressMetrics.totalLeadsEnriched += 1;
            return { ...entry, seo: seoData };
        }));

        logger.info("Data enrichment complete", { count: enrichedData.length });
        sendUpdate(`Enrichment complete. ${enrichedData.length} leads enriched.`);

    } catch (err) {
        const errorMessage = `Error in automation pipeline: ${err.message}`;
        logger.error(errorMessage);
        progressMetrics.errors.push(errorMessage);
        sendUpdate(errorMessage);
    }
})();
