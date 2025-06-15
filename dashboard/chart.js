import { db, collection, getDocs } from './firebase-config.js';

const ctx = document.getElementById('moodChart').getContext('2d');

async function loadMoodData() {
  const moodRef = collection(db, "moods");
  const snapshot = await getDocs(moodRef);

  const dates = [];
  const moods = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    dates.push(data.date);     // Assuming { date: "Mon", mood: 4 }
    moods.push(data.mood);
  });

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Mood (1–5)',
        data: moods,
        borderColor: '#00ffe1',
        fill: false
      }]
    },
    options: {
      scales: {
        y: { min: 1, max: 5, ticks: { stepSize: 1 } }
      }
    }
  });
}

loadMoodData();