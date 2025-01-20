require('dotenv').config(); // Load environment variables
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Function to send a message
async function sendUpdate(message) {
    try {
        await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
        console.log("Message sent successfully!");
    } catch (error) {
        console.error("Failed to send Telegram update:", error);
    }
}

// Optional start command
bot.start((ctx) => ctx.reply("Welcome!"));

bot.launch();

module.exports = sendUpdate;
