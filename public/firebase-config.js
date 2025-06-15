import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);