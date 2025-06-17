import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB_C5INwZtDA2cjz5VG3slhpg1hkmvmgH8",
    authDomain: "mind-ping.firebaseapp.com",
    projectId: "mind-ping",
    storageBucket: "mind-ping.appspot.com",
    messagingSenderId: "889858727227",
    appId: "1:889858727227:web:a1eb1b70b7c0b8b92b6b1e",
    measurementId: "G-HX1QPJPZ8S"
  };

  // Initialize Firebase app
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app); // ✅ Correctly initialized here

  window.addEventListener('DOMContentLoaded', () => {
    // ✅ Attach reCAPTCHA only after DOM and auth are ready
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: (response) => {
        console.log('✅ reCAPTCHA solved');
      },
      'expired-callback': () => {
        console.warn('⚠️ reCAPTCHA expired');
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
        console.error(error);
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
});