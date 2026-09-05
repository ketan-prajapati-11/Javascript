/* =====================================================
   QUESTION PAGE (question.html) ONLY.
   Depends on questionBank.js being loaded first — it uses
   the global `getQuestions` and `checkAnswer` functions
   and the global `questionBank` array defined there.
   ===================================================== */

/* ===================== Theme toggle ===================== */
/* Same logic as script.js. Kept as its own copy here (rather
   than shared) because script.js is a plain page script, not
   a module — and script.js itself queries elements (like the
   quiz setup form) that don't exist on this page, so loading
   script.js here would throw errors before this code could run. */
const themeToggle = document.querySelector('.theme-toggle');
const body = document.querySelector('body');

const applyTheme = (isDark) => {
  body.classList.toggle('darkmode', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
};

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  applyTheme(true);
} else if (savedTheme === 'light') {
  applyTheme(false);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

themeToggle.addEventListener('click', () => {
  const isDark = !body.classList.contains('darkmode');
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches);
  }
});

/* ===================== Load the setup saved on index.html ===================== */
const quizSetup = JSON.parse(localStorage.getItem('quizSetup') || 'null');

if (!quizSetup) {
  // Someone opened question.html directly without filling out the form first.
  // Send them back to set up a quiz — there's nothing to show here otherwise.
  window.location.href = 'index.html';
}

const { playerName, categoryLabel, difficulty, questionCount } = quizSetup;

/* ===================== Shuffle helper ===================== */
// Fisher–Yates shuffle — returns a NEW shuffled array and never mutates
// the one passed in. That matters here because questions come straight
// from the shared `questionBank` array (questionBank.js) — mutating it
// in place would corrupt the master list for any later shuffle.
function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ===================== Build this session's question set ===================== */
const availableQuestions = getQuestions(categoryLabel, difficulty); // global from questionBank.js
const totalQuestions = Math.min(questionCount, availableQuestions.length);

// Shuffle the FULL pool first, then slice — this randomizes both which
// questions get picked out of the 15 available and the order they're
// asked in, so no two attempts look the same. Each picked question is
// cloned (`{ ...q }`) with its own shuffled `options` array, so the
// answer position varies too, without ever touching the original
// questionBank objects.
const questions = shuffleArray(availableQuestions)
  .slice(0, totalQuestions)
  .map((q) => ({ ...q, options: shuffleArray(q.options) }));

// One slot per question in this session. Stays `null` until the user
// picks an option or the timer runs out on that question.
const userAnswers = new Array(totalQuestions).fill(null);

let currentIndex = 0;
let isLocked = false; // true once the current question has been answered (or timed out)

/* ===================== Cache DOM elements ===================== */
const playerNameEl = document.querySelector('.question-player-name');
const categoryTagEl = document.querySelector('.quiz-tag');
const categoryNameEl = document.querySelector('.selected-category');
const difficultyNameEl = document.querySelector('.selected-difficulty-level');

const questionTitleEl = document.querySelector('.question-title');
const questionPromptEl = document.querySelector('.question-prompt');
const optionEls = document.querySelectorAll('.question-option');
const feedbackEl = document.querySelector('.question-feedback');

const currQuestionNumberEl = document.querySelector('.curr-question-number');
const totalQuestionNumberEl = document.querySelector('.total-question-number');
const progressFillEl = document.querySelector('.question-progress-fill');

const timerTextEl = document.querySelector('.question-timer-text');
const timerProgressEl = document.querySelector('.timer-progress');

const saveContinueBtn = document.getElementById('save-continue-btn');

/* ===================== Helpers ===================== */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Same tick/cross shapes used on review.js, so a correct/wrong option
// looks the same whether you're seeing it live or reviewing it after.
const CHECK_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
const CROSS_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="M6 6l12 12"></path></svg>';

/* ===================== Render a question by index ===================== */
function renderQuestion(index) {
  const q = questions[index];

  // Top bar: player name + category/difficulty tag
  playerNameEl.textContent = playerName;
  categoryNameEl.textContent = categoryLabel + ' ';
  difficultyNameEl.textContent = ' ' + capitalize(difficulty);

  categoryTagEl.classList.remove('quiz-tag--easy', 'quiz-tag--medium', 'quiz-tag--hard');
  categoryTagEl.classList.add(`quiz-tag--${difficulty}`);

  // Question text (questionBank.js already uses proper ² ³ unicode
  // characters for math, so plain textContent is enough — no markup needed)
  questionTitleEl.textContent = `Question ${index + 1}`;
  questionPromptEl.textContent = q.question;

  // Answer options — fresh text/value for this question, and a full
  // reset of whatever reveal state the previous question left behind
  // (unlocked, original A/B/C/D letter, no highlight, nothing checked).
  optionEls.forEach((optionEl, i) => {
    const input = optionEl.querySelector('input[type="radio"]');
    const markerEl = optionEl.querySelector('.option-marker');
    const textEl = optionEl.querySelector('.option-text');

    const optionValue = q.options[i];
    markerEl.textContent = String.fromCharCode(65 + i); // A, B, C, D
    textEl.textContent = optionValue;
    input.value = optionValue;
    input.checked = false;
    input.disabled = false;

    optionEl.classList.remove('question-option--correct', 'question-option--wrong');
  });

  // Reset the reveal state for this new question
  isLocked = false;
  feedbackEl.textContent = '';
  feedbackEl.className = 'question-feedback';
  saveContinueBtn.disabled = true; // nothing to continue to until an answer is locked in

  // "Question X of Y" + progress bar
  currQuestionNumberEl.textContent = index + 1;
  totalQuestionNumberEl.textContent = totalQuestions;
  progressFillEl.style.width = `${((index + 1) / totalQuestions) * 100}%`;

  const isLastQuestion = index === totalQuestions - 1;
  saveContinueBtn.textContent = isLastQuestion ? 'Finish Quiz' : 'Save & Continue';

  // Fresh 15-second countdown for this question
  startTimer();
}

/* ===================== Score tally (recomputed fresh each time) ===================== */
function logScore(justAnsweredIndex, isCorrect, selectedAnswer) {
  const q = questions[justAnsweredIndex];

  // Every question up to this one has now been decided one way or another
  // (answered, or timed out) — with no way to go back, "attempted" is just
  // everything from index 0 through justAnsweredIndex.
  let correctCount = 0;
  for (let i = 0; i <= justAnsweredIndex; i++) {
    if (userAnswers[i] !== null && checkAnswer(questions[i], userAnswers[i])) correctCount++;
  }

  const attemptedCount = justAnsweredIndex + 1;
  const wrongCount = attemptedCount - correctCount;

  console.log(
    `Question ${justAnsweredIndex + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}` +
      ` — your answer: "${selectedAnswer ?? 'No answer (time ran out)'}", correct answer: "${q.answer}"`
  );
  console.log(`Score so far: ${correctCount} correct, ${wrongCount} incorrect, out of ${attemptedCount} attempted`);

  if (justAnsweredIndex === totalQuestions - 1) {
    console.log(`Quiz complete! Final score: ${correctCount} / ${totalQuestions}`);
  }
}

/* ===================== Per-question countdown timer =====================
   Ring construction matches the static markup already in question.html/css
   (circle, r=27, dasharray 169.6) — this just drives stroke-dashoffset and
   the mm:ss text every second. */
const QUESTION_TIME_LIMIT = 15; // seconds
const TIMER_CIRCUMFERENCE = 169.6; // 2 * PI * r(27) — matches question.css

let timeLeft = QUESTION_TIME_LIMIT;
let timerInterval = null;

function updateTimerDisplay() {
  timerTextEl.textContent = `0:${String(timeLeft).padStart(2, '0')}`;

  const fraction = timeLeft / QUESTION_TIME_LIMIT;
  timerProgressEl.style.strokeDashoffset = TIMER_CIRCUMFERENCE * (1 - fraction);
}

function startTimer() {
  clearInterval(timerInterval); // in case one was already running
  timeLeft = QUESTION_TIME_LIMIT;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Reaching 0 only happens if nothing was ever clicked — selecting an
      // option locks the answer (and stops this interval) immediately, so
      // a real timeout always means "nothing was picked."
      lockAnswer(null);
    }
  }, 1000);
}

/* ===================== Lock in an answer: stop the timer, reveal right/wrong =====================
   Fires the instant the user picks an option, OR when time runs out with
   nothing picked. Either way the question is now "decided": the timer
   stops, the correct option lights up green, a wrong pick (if any) lights
   up red, and Save & Continue unlocks so the user can move on when ready. */
function lockAnswer(selectedAnswer) {
  if (isLocked) return;
  isLocked = true;

  clearInterval(timerInterval);

  const q = questions[currentIndex];
  userAnswers[currentIndex] = selectedAnswer; // null if time ran out unanswered
  const isCorrect = selectedAnswer !== null && checkAnswer(q, selectedAnswer);

  optionEls.forEach((optionEl) => {
    const input = optionEl.querySelector('input[type="radio"]');
    const markerEl = optionEl.querySelector('.option-marker');
    input.disabled = true; // choice is locked in — no more changes this question

    if (input.value === q.answer) {
      optionEl.classList.add('question-option--correct');
      markerEl.innerHTML = CHECK_ICON;
    } else if (input.value === selectedAnswer) {
      optionEl.classList.add('question-option--wrong');
      markerEl.innerHTML = CROSS_ICON;
    }
  });

  feedbackEl.classList.remove('question-feedback--correct', 'question-feedback--wrong', 'question-feedback--skipped');
  if (selectedAnswer === null) {
    feedbackEl.textContent = 'Not answered — the correct answer is highlighted above.';
    feedbackEl.classList.add('question-feedback--skipped');
  } else if (isCorrect) {
    feedbackEl.textContent = 'Correct!';
    feedbackEl.classList.add('question-feedback--correct');
  } else {
    feedbackEl.textContent = 'Incorrect — the correct answer is highlighted above.';
    feedbackEl.classList.add('question-feedback--wrong');
  }

  logScore(currentIndex, isCorrect, selectedAnswer);

  saveContinueBtn.disabled = false; // reveal is done — user can move on now
}

/* ===================== Finish quiz: tally + hand off to result.html =====================
   Builds one clean object holding everything result.html and review.html
   need, and passes it along via localStorage — same handoff pattern
   index.html already uses to pass `quizSetup` here. */
function finishQuiz() {
  let correctCount = 0;

  // Per-question breakdown, used by result.html's stats and review.html's
  // per-question highlighting.
  const answers = questions.map((q, i) => {
    const selectedAnswer = userAnswers[i]; // null if the user never answered it
    const isCorrect = selectedAnswer !== null && checkAnswer(q, selectedAnswer);
    if (isCorrect) correctCount++;

    return {
      question: q.question,
      options: q.options,
      correctAnswer: q.answer,
      selectedAnswer,
      isCorrect
    };
  });

  const wrongCount = totalQuestions - correctCount;

  const quizResult = {
    playerName,
    categoryLabel,
    difficulty,
    totalQuestions,
    correctCount,
    wrongCount,
    answers
  };

  localStorage.setItem('quizResult', JSON.stringify(quizResult));
  window.location.href = 'result.html';
}

/* ===================== Event listeners ===================== */
// Selecting an option is what locks the answer in now — no more waiting
// for a Save & Continue click to find out if you were right or wrong.
optionEls.forEach((optionEl) => {
  const input = optionEl.querySelector('input[type="radio"]');
  input.addEventListener('change', () => {
    if (isLocked) return; // inputs get disabled on lock, so this is just a safety net
    lockAnswer(input.value);
  });
});

// Once locked, Save & Continue just moves things forward.
saveContinueBtn.addEventListener('click', () => {
  if (!isLocked) return; // button is disabled until locked; safety net only

  const isLastQuestion = currentIndex === totalQuestions - 1;
  if (isLastQuestion) {
    finishQuiz();
    return;
  }

  currentIndex++;
  renderQuestion(currentIndex);
});

/* ===================== Initial render ===================== */
renderQuestion(currentIndex);