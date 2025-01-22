require("dotenv").config();

const connectDB = require("./utils/db");
const scrapeCrunchBase = require("./scrapers/crunchbase");
const enrichWithSEO = require("./enrichers/seo");
const { startDashboard, progressMetrics } = require("./services/dashboard");
const sendUpdate = require("./services/bot");
const logger = require("./utils/logger");

(async function main() {
    try {
        // Connect to the database
        logger.info("Connecting to the database...");
        await connectDB();
        logger.info("Database connected successfully.");

        // Start the dashboard server
        startDashboard();
        logger.info("Dashboard started successfully.");

        // Scraping leads
        logger.info("Starting data scraping...");
        sendUpdate("Pipeline started: Scraping data...");
        const data = await scrapeCrunchBase();
        progressMetrics.totalLeadsScraped = data.length;
        logger.info(`Scraping complete. ${data.length} leads scraped.`);

        // Enriching leads
        logger.info("Starting data enrichment...");
        sendUpdate(`Scraped ${data.length} leads. Starting enrichment...`);
        const enrichedData = [];
        for (const entry of data) {
            try {
                const seoData = await enrichWithSEO(entry.website);
                progressMetrics.totalLeadsEnriched += 1;
                enrichedData.push({ ...entry, seo: seoData });
            } catch (enrichError) {
                const errorMsg = `Error enriching data for ${entry.website}: ${enrichError.message}`;
                logger.error(errorMsg);
                progressMetrics.errors.push(errorMsg);
            }
        }

        logger.info(`Enrichment complete. ${enrichedData.length} leads enriched.`);
        sendUpdate(`Enrichment complete. ${enrichedData.length} leads enriched.`);

        // Final pipeline completion log
        logger.info("Automation pipeline completed successfully.");
        sendUpdate("Pipeline completed successfully!");

    } catch (err) {
        // Catch general errors in the pipeline
        const errorMessage = `Error in automation pipeline: ${err.message}`;
        logger.error(errorMessage);
        progressMetrics.errors.push(errorMessage);
        sendUpdate(errorMessage);
    }
})();
