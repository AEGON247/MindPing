import express from 'express';
import { MessagingResponse } from 'twilio';
import admin from 'firebase-admin';

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post('/sms', async (req, res) => {
  const userPhone = req.body.From;
  const messageBody = req.body.Body?.trim();

  console.log(`Incoming from ${userPhone}: ${messageBody}`);

  const moodRating = parseInt(messageBody);
  if (!isNaN(moodRating)) {
    await admin.firestore().collection('checkins').add({
      phone: userPhone,
      mood: moodRating,
      timestamp: new Date(),
    });

    const twiml = new MessagingResponse();
    twiml.message(`✅ Mood rating ${moodRating} recorded. Thanks for checking in!`);
    res.type('text/xml').send(twiml.toString());
  } else {
    const twiml = new MessagingResponse();
    twiml.message(`⚠️ Sorry, I didn't understand that. Please reply with a number from 1 to 10.`);
    res.type('text/xml').send(twiml.toString());
  }
});

export default app;