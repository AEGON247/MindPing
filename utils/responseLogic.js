const admin = require('firebase-admin');
const db = admin.firestore();

exports.storeMood = async (userId, mood) => {
  const today = new Date().toISOString().split('T')[0];
  await db.collection('moods').add({
    userId,
    mood,
    date: today
  });
};

exports.getResponseForMood = (mood) => {
  if (mood <= 2) return "I'm here for you. Take a deep breath. 🌱";
  if (mood === 3) return "Hope your day gets better! 💪";
  return "Glad to hear you're feeling good today! 🌞";
};