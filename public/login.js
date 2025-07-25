import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_C5INwZtDA2cjz5VG3slhpg1hkmvmgH8",
  authDomain: "mind-ping.firebaseapp.com",
  projectId: "mind-ping",
  storageBucket: "mind-ping.appspot.com",
  messagingSenderId: "889858727227",
  appId: "1:889858727227:web:a1eb1b70b7c0b8b92b6b1e",
  measurementId: "G-HX1QPJPZ8S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth, "recaptcha-container",
    {
      size: "normal",
      callback: (response) => {
        console.log("✅ reCAPTCHA solved");
      },
      "expired-callback": () => {
        console.warn("⚠️ reCAPTCHA expired");
      }
    }
  );

  document.getElementById("sendOtp").addEventListener("click", async () => {
    const phone = document.getElementById("phoneNumber").value;
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = result;
      document.getElementById("otpSection").style.display = "block";
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      alert(error.message);
    }
  });

  document.getElementById("verifyOtp").addEventListener("click", async () => {
    const code = document.getElementById("otp").value;
    try {
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
      await setDoc(doc(db, "users", user.phoneNumber), {
        phone: user.phoneNumber,
        createdAt: new Date().toISOString()
      });
      alert("✅ Logged in successfully!");
      window.location.href = "index.html";
    } catch (err) {
      alert("❌ Incorrect OTP");
    }
  });
});