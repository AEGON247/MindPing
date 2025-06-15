require("dotenv").config();
const admin = require("firebase-admin");

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

// ✅ This is your exported webhook handler
const handleSmsWebhook = async (req, res) => {
  const from = req.body.From;
  const message = req.body.Body.trim();

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
};

// ✅ Export it
module.exports = { handleSmsWebhook };