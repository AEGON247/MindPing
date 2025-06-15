const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
module.exports = db;