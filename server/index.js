// server/index.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twilioWebhook = require("./twilioWebhook");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/twilio", twilioWebhook);

app.get("/", (req, res) => {
  res.send("MindPing Server is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});