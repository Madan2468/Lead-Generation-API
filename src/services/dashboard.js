const express = require("express");
const logger = require("../utils/logger");

const app = express();
let progressMetrics = {
    totalLeadsScraped: 0,
    totalLeadsEnriched: 0,
    errors: [],
};

// Root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the Dashboard! Use /metrics to view progress metrics.");
});

// Endpoint for progress metrics
app.get("/metrics", (req, res) => {
    res.json(progressMetrics);
});

// Endpoint to simulate errors (useful for testing)
app.post("/simulate-error", (req, res) => {
    const error = `Simulated error at ${new Date().toISOString()}`;
    progressMetrics.errors.push(error);
    logger.error(error);
    res.json({ message: "Error simulated" });
});

// Start the server
function startDashboard() {
    const PORT = process.env.DASHBOARD_PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Dashboard running on http://localhost:${PORT}`);
    });
}

module.exports = { startDashboard, progressMetrics };
