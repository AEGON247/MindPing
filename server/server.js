// server/server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const path = require("path");
const { sendDailyCheckIn } = require("./cron");
const { handleSmsWebhook } = require("./sms");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "dashboard"))); // serve frontend

// Webhook route
app.post("/sms", handleSmsWebhook);

// Schedule cron: 9:00 AM daily
cron.schedule("0 9 * * *", async () => {
  console.log("📅 Running daily SMS check-in");
  await sendDailyCheckIn();
});

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});