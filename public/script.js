const ctx = document.getElementById("moodChart").getContext("2d");

const auth = firebase.auth();
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    const userId = user.phoneNumber; // Firestore doc ID
    loadMoodChart(userId);
  } else {
    alert("Please sign in to view your mood data.");
    // You can redirect to login if needed
  }
});

async function loadMoodChart(userId) {
  const moodsRef = db.collection("users").doc(userId).collection("moods");
  const snapshot = await moodsRef.get();
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