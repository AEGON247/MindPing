require("dotenv").config();
const twilio = require("twilio");
const cron = require("node-cron");
const admin = require("firebase-admin");

// Initialize Twilio
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();

// Helper: get all user phone numbers from Firestore
async function getAllUsers() {
  const snapshot = await db.collection("users").get();
  const users = [];
  snapshot.forEach(doc => {
    users.push({ phone: doc.id }); // doc.id is the phone number
  });
  return users;
}

// Helper: send message via Twilio
async function sendCheckIn(phone) {
  const today = new Date().toISOString().split("T")[0]; // e.g. 2025-06-14

  // Initialize Firestore structure if not exists
  const moodRef = db.collection("users").doc(phone).collection("moods").doc(today);
  await moodRef.set({
    mood: null,   // to be updated later when user replies
    date: today
  });

  await client.messages.create({
    body: "🌞 Hey! How are you feeling today (1 = bad, 5 = great)? Reply with a number!",
    from: fromNumber,
    to: phone
  });

  console.log(`✅ Sent to ${phone}`);
}

// MAIN FUNCTION — runs daily
async function sendDailyCheckIn() {
  const users = await getAllUsers();
  for (const user of users) {
    try {
      await sendCheckIn(user.phone);
    } catch (error) {
      console.error(`❌ Failed for ${user.phone}:`, error.message);
    }
  }
}

// Schedule to run daily at 9:00 AM IST (adjust for your timezone)
cron.schedule("0 9 * * *", () => {
  console.log("📅 Running daily check-in job...");
  sendDailyCheckIn();
});