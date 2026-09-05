/* =====================================================
   HOME PAGE (index.html) ONLY.
   The question bank now lives in its own file
   (questionBank.js) — it doesn't belong here, and having
   it here meant this file couldn't safely be reused on
   question.html (this file also queries elements like
   .quize-selection-form that only exist on the home page).
   ===================================================== */

/* ===================== Theme toggle ===================== */
const themeToggle = document.querySelector('.theme-toggle');
const body = document.querySelector('body');

const applyTheme = (isDark) => {
  body.classList.toggle('darkmode', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
};

// Saved choice wins, otherwise fall back to OS preference
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

/* ===================== Number of questions stepper ===================== */
const minusBtn = document.querySelector('.minus-icon');
const plusBtn = document.querySelector('.plus-icon');
const countDisplay = document.querySelector('.number-count');

const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 15; // capped at 15 — that's how many questions exist per category/difficulty in questionBank.js
const STEP = 5;

function updateQuestionCount(delta) {
  let value = parseInt(countDisplay.textContent, 10) || MIN_QUESTIONS;
  value = Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, value + delta));
  countDisplay.textContent = value;
}

minusBtn.addEventListener('click', () => updateQuestionCount(-STEP));
plusBtn.addEventListener('click', () => updateQuestionCount(STEP));

/* ===================== Form submit: save setup + go to the quiz ===================== */
const quizForm = document.querySelector('.quize-selection-form');
const playerNameInput = document.getElementById('player-name');
const categorySelect = document.getElementById('quiz-category');

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    playerNameInput.focus();
    return;
  }

  const category = categorySelect.value; // e.g. "math" — the option's value attribute
  // e.g. "Math" — the option's visible text, which matches questionBank.js's
  // `category` field exactly (both say "Math", "Science", "History")
  const categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;

  const difficultyChecked = document.querySelector('input[name="difficulty"]:checked');
  const difficulty = difficultyChecked ? difficultyChecked.value : 'medium'; // "easy" / "medium" / "hard"

  const questionCount = parseInt(countDisplay.textContent, 10);

  const quizSetup = { playerName, category, categoryLabel, difficulty, questionCount };

  // Hand this off to question.html via localStorage, since a normal
  // link/redirect can't carry JS objects between pages.
  localStorage.setItem('quizSetup', JSON.stringify(quizSetup));

  window.location.href = 'question.html';
});