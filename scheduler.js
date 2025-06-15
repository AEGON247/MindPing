const cron = require('node-cron');
const twilio = require('twilio');
require('dotenv').config();
const db = require('./firebaseConfig');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendDailyMoodCheck = async () => {
  const snapshot = await db.collection('users').get();
  snapshot.forEach(doc => {
    const phone = doc.data().phone;
    client.messages.create({
      body: "Hi! How are you feeling today (1–5)?",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
  });
};

// Run every day at 8 AM
cron.schedule('0 8 * * *', () => {
  console.log('Sending daily mood check SMS...');
  sendDailyMoodCheck();
});