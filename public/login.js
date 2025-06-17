// login.js
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': () => {
    console.log('Recaptcha solved ✅');
  }
}, auth);

// Handle Send OTP
document.getElementById("sendOtp").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    alert("OTP sent!");
    document.getElementById("otpSection").style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Failed to send OTP: " + error.message);
  }
});

// Handle OTP Verification
document.getElementById("verifyOtp").addEventListener("click", async () => {
  const otp = document.getElementById("otp").value;

  try {
    const result = await window.confirmationResult.confirm(otp);
    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Invalid OTP. Try again.");
  }
});

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "index.html";
});