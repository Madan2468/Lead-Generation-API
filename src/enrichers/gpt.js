const axios = require("axios");

async function enrichWithGPT(data) {
    const response = await axios.post("https://api.openai.com/v1/completions", {
        prompt: `Analyze the following data: ${JSON.stringify(data)}`,
        max_tokens: 100,
    }, {
        headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
    });
    return response.data.choices[0].text;
}

module.exports = enrichWithGPT;
