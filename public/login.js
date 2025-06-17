import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "firebase-admin/auth";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getApps } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

let app;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
const auth = getAuth(app);
const db = getFirestore(app);

const firebaseConfig = {
      apiKey: "AIzaSyB_C5INwZtDA2cjz5VG3slhpg1hkmvmgH8",
      authDomain: "mind-ping.firebaseapp.com",
      projectId: "mind-ping",
      storageBucket: "mind-ping.appspot.com",
      messagingSenderId: "889858727227",
      appId: "1:889858727227:web:a1eb1b70b7c0b8b92b6b1e",
      measurementId: "G-HX1QPJPZ8S"
    };

window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': () => {
        console.log('Recaptcha solved ✅');
      }
    }, auth);

document.getElementById("sendOtp").addEventListener("click", async () => {
      const phone = document.getElementById("phoneNumber").value;
      const appVerifier = window.recaptchaVerifier;

      try {
        const result = await signInWithPhoneNumber(auth, phone, appVerifier);
        window.confirmationResult = result;
        document.getElementById("otpSection").style.display = "block";
      } catch (error) {
        alert(error.message);
      }
    });

    document.getElementById("verifyOtp").addEventListener("click", async () => {
      const code = document.getElementById("otp").value;
      try {
        await window.confirmationResult.confirm(code);
        alert("✅ Logged in successfully!");
        window.location.href = "index.html";
      } catch (err) {
        alert("❌ Incorrect OTP");
      }
});