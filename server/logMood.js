// server/logMood.js
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Only initialize once (for server context)
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

/**
 * Logs a user's mood rating into Firestore
 * @param {string} userId - Unique user ID or phone number
 * @param {number} mood - Mood rating (1–5)
 */
async function logMood(userId, mood) {
  const date = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  await db.collection("users").doc(userId).collection("moods").add({
    date,
    mood,
  });
  console.log(`✅ Mood ${mood} logged for user ${userId} on ${date}`);
}

module.exports = { logMood };