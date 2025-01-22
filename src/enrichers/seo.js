const axios = require("axios");
const logger = require("../utils/logger");

async function enrichWithSEO(website) {
    if (!website || !website.startsWith("http")) {
        logger.warn(`Invalid website URL provided: ${website}`);
        return { error: "Invalid website URL" };
    }

    try {
        logger.info(`Fetching SEO data for: ${website}`);
        const response = await axios.get(`https://api.ubersuggest.io/seo?url=${website}`, {
            timeout: 10000, // Timeout after 10 seconds
        });

        if (response.status === 200 && response.data) {
            logger.info(`SEO data fetched successfully for: ${website}`);
            return response.data; // Return the actual SEO data
        } else {
            logger.warn(`Unexpected response for ${website}: ${response.status}`);
            return { error: "No data returned from SEO API" };
        }
    } catch (error) {
        logger.error(`Error fetching SEO data for ${website}: ${error.message}`);
        return { error: error.message };
    }
}

module.exports = enrichWithSEO;
