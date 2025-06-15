// script.js
import { db, auth } from "./firebase-config.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ctx = document.getElementById("moodChart").getContext("2d");

// 🔐 Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.phoneNumber;
    loadMoodChart(userId);
  } else {
    window.location.href = "login.html"; // 🔄 Redirect to login
  }
});

async function loadMoodChart(userId) {
  const moodsRef = collection(db, "users", userId, "moods");
  const snapshot = await getDocs(moodsRef);
  const moodEntries = [];

  snapshot.forEach(doc => moodEntries.push(doc.data()));
  moodEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = moodEntries.map(e => e.date);
  const data = moodEntries.map(e => e.mood);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Mood (1 = Bad, 5 = Great)",
        data,
        borderColor: "#00ffe1",
        borderWidth: 2,
        pointBackgroundColor: "#fff"
      }]
    },
    options: {
      scales: {
        y: {
          min: 1,
          max: 5,
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}