const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Database connected"))
        .catch(err => console.error("Database connection error:", err));
}

module.exports = connectDB;
