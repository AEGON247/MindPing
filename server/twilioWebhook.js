require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Twilio sends data as x-www-form-urlencoded

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

// Incoming SMS Webhook
app.post("/sms", async (req, res) => {
  const from = req.body.From;          // e.g. "+919876543210"
  const message = req.body.Body.trim(); // e.g. "3"

  const mood = parseInt(message, 10);
  if (!mood || mood < 1 || mood > 5) {
    console.log(`⚠️ Invalid mood from ${from}: ${message}`);
    return res.send(`<Response><Message>Please send a number between 1 (bad) and 5 (great) 🌈</Message></Response>`);
  }

  const today = new Date().toISOString().split("T")[0];
  const docRef = db.collection("users").doc(from).collection("moods").doc(today);

  await docRef.set({
    mood: mood,
    date: today
  }, { merge: true });

  console.log(`✅ Logged mood ${mood} for ${from}`);

  res.send(`<Response><Message>Thanks! Your mood (${mood}) was logged 💖</Message></Response>`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SMS webhook server running on port ${PORT}`);
});