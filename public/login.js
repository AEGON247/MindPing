import { auth } from "./firebase-config.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'normal',
  callback: (response) => {
    console.log("reCAPTCHA verified");
  },
  'expired-callback': () => {
    alert("reCAPTCHA expired. Please try again.");
  }
});

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

document.getElementById("verifyOtp").addEventListener("click", async () => {
  const otp = document.getElementById("otp").value;

  try {
    const result = await window.confirmationResult.confirm(otp);
    alert("Login successful!");
    window.location.href = "index.html"; // Redirect to dashboard
  } catch (error) {
    alert("Invalid OTP. Try again.");
  }
});
