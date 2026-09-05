/* =====================================================
   RESULT PAGE (result.html) ONLY.
   Depends on question.js having already run and saved a
   `quizResult` object to localStorage before redirecting
   here — see finishQuiz() in question.js.
   ===================================================== */

/* ===================== Theme toggle ===================== */
/* Same copy-per-page pattern as question.js — kept separate
   from script.js since script.js queries elements (the quiz
   setup form) that don't exist on this page. */
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

/* ===================== Load the result saved on question.html ===================== */
const quizResult = JSON.parse(localStorage.getItem('quizResult') || 'null');

if (!quizResult) {
  // Someone opened result.html directly without finishing a quiz first —
  // same guard pattern question.js uses for a missing quizSetup.
  window.location.href = 'index.html';
}

const { totalQuestions, correctCount, wrongCount } = quizResult;
// `quizResult.answers` also exists (built in finishQuiz()), ready for the
// Review Answers page to read straight out of localStorage once it's built.

/* ===================== Cache DOM elements ===================== */
const scoreValueEl = document.querySelector('.result-score-value');
const scoreTotalEl = document.querySelector('.result-score-total');
const scoreProgressEl = document.querySelector('.score-progress');

const correctStatValueEl = document.querySelector('.result-stat--correct .result-stat-value');
const wrongStatValueEl = document.querySelector('.result-stat--wrong .result-stat-value');

const reviewAnswersBtn = document.getElementById('review-answers-btn');

/* ===================== Fill in the real score ===================== */
// `.result-score-value` markup is `7<span class="result-score-total">/10</span>`
// with no whitespace before the "7", so its firstChild is reliably that text node.
scoreValueEl.firstChild.textContent = correctCount;
scoreTotalEl.textContent = `/${totalQuestions}`;

correctStatValueEl.textContent = correctCount;
wrongStatValueEl.textContent = wrongCount;


// Ring fill — same construction as the question-page countdown timer:
// a circle rotated -90deg, filled via stroke-dasharray / stroke-dashoffset.
const RING_CIRCUMFERENCE = 565.5; // 2 * PI * r(90) — matches result.css
const scoreFraction = totalQuestions > 0 ? correctCount / totalQuestions : 0;

scoreProgressEl.style.strokeDasharray = RING_CIRCUMFERENCE;
scoreProgressEl.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - scoreFraction);

/* ===================== Review Answers ===================== */
// No review.html yet — wire this up once that page exists, e.g.:
reviewAnswersBtn.addEventListener('click', () => {
  window.location.href = 'review.html';
});