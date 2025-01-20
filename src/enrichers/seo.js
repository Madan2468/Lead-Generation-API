const axios = require("axios");

async function enrichWithSEO(website) {
    const response = await axios.get(`https://api.ubersuggest.io/seo?url=${website}`);
    return response.data; // Example: Traffic, keywords, etc.
}

module.exports = enrichWithSEO;
