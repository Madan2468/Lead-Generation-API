const axios = require("axios");

async function scrapeGoogle(query) {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${query}&key=YOUR_API_KEY`);
    const results = response.data.items.map(item => ({
        title: item.title,
        link: item.link,
    }));
    return results;
}

module.exports = scrapeGoogle;
