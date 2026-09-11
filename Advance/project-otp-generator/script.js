const form = document.querySelector(".otp-form");

const displayOtp = document.querySelector(".display-otp");
const timerDigit = document.querySelector(".timer-digit");
const progressBar = document.querySelector(".progress-bar");

const verifiedMsg = document.querySelector(".verified");
const nonVerifiedMsg = document.querySelector(".non-verified");
const inputOtp = document.querySelector("#inp-otp");

const leftAttempt = document.querySelector(".left-attempt");
const resendOtp = document.querySelector(".resend-otp");

const generateOtpBtn = document.querySelector(".generate-otp");
const verifyBtn = document.querySelector(".verify");

const TIME_LIMIT = 30; // time limit of otp
const ATTEMPT_LIMIT = 3; // onlyyy 3 attempts for the ootp
let timeLeft = TIME_LIMIT;
let attemptsLeft = ATTEMPT_LIMIT;
let timerInterval = null;

let attemptsBox = document.querySelector(".attempts");

function randomOtp() {
  return Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
}

function showStatus(status, statustext) {
  // status means verified or giving error
  verifiedMsg.classList.add("hidden");
  nonVerifiedMsg.classList.add("hidden");
  if (status === "verified") {
    verifiedMsg.textContent = statustext || "Verified OTP";
    verifiedMsg.classList.remove("hidden");
  } else if (status === "error") {
    nonVerifiedMsg.textContent = statustext;
    nonVerifiedMsg.classList.remove("hidden");
  }
}

function updateTimerDisplay() {
  timerDigit.textContent = `00:${String(Math.max(timeLeft, 0)).padStart(2, "0")}`;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function lockForm() {
  inputOtp.disabled = true;
  verifyBtn.disabled = true;
}

function unlockForm() {
  inputOtp.disabled = false;
  verifyBtn.disabled = false;
  verifyBtn.classList.remove("hidden");
}

function startTimer() {
  stopTimer();
  timeLeft = TIME_LIMIT;
  progressBar.classList.remove("low-time");
  progressBar.style.setProperty("--progress", "0%");
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    const percentageRemaining = 100 - (timeLeft / TIME_LIMIT) * 100;
    progressBar.style.setProperty("--progress", `${percentageRemaining}%`);
    if (percentageRemaining > 80) {
      progressBar.classList.add("low-time");
    }

    if (timeLeft <= 0) {
      stopTimer();
      lockForm();
      //checking the after the timeover what happen
      leftAttempt.classList.add("hidden");
      leftAttempt.nextSibling.textContent = "No attempts left ";
      showStatus("error", "OTP expired. Tap Resend OTP");
    }
  }, 1000);
}

function startNewRound() {
  stopTimer();
  otp = randomOtp();
  displayOtp.textContent = otp;
  attemptsBox.classList.remove("hidden");
  leftAttempt.nextSibling.textContent = " attempts left";

  attemptsLeft = ATTEMPT_LIMIT;
  leftAttempt.textContent = attemptsLeft;
  leftAttempt.classList.remove("hidden");
  timerDigit.classList.remove("hidden");
  progressBar.classList.remove("hidden");

  inputOtp.value = "";
  unlockForm();
  showStatus(null);

  startTimer();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // if (inputOtp.disabled) return;

  const inputVal = parseInt(inputOtp.value, 10);

  if (inputVal === otp) {
    stopTimer();
    lockForm();
    leftAttempt.classList.add("hidden");
    timerDigit.classList.add("hidden");
    // progressBar.classList.add("hidden"); i have to change it in timebar
    progressBar.classList.add("hidden");
    showStatus("verified", "Verified OTP");
    // disabling the attemp and resend button
    attemptsBox.classList.add("hidden");
    return;
  }
  attemptsBox.classList.remove("hidden");

  attemptsLeft = Math.max(attemptsLeft - 1, 0);
  leftAttempt.textContent = attemptsLeft;
  inputOtp.value = "";

  if (attemptsLeft === 0) {
    timerDigit.classList.add("hidden");
    progressBar.classList.add("hidden");
    lockForm();
    stopTimer();
    lockForm();

    //checking the after the timeover what happen
    leftAttempt.classList.add("hidden");
    leftAttempt.nextSibling.textContent = "No attempts left ";
    showStatus(
      "error",
      "Max attempts reached. Tap Generate OTP or Resend OTP for a new code.",
    );
  } else {
    showStatus("error", `Wrong OTP.`); // i can write instead that also  ${attemptsLeft} attempt(s) left.
  }
});

generateOtpBtn.addEventListener("click", startNewRound);
resendOtp.addEventListener("click", startNewRound);

startNewRound();
