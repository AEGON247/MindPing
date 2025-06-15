// firebase-config.js (no imports)
const firebaseConfig = {
  apiKey: "AIzaSyB_C5INwZtDA2cjz5VG3slhpg1hkmvmgH8",
  authDomain: "mind-ping.firebaseapp.com",
  projectId: "mind-ping",
  storageBucket: "mind-ping.firebasestorage.app",
  messagingSenderId: "889858727227",
  appId: "1:889858727227:web:a1eb1b70b7c0b8b92b6b1e",
  measurementId: "G-HX1QPJPZ8S"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const analytics = firebase.analytics();