/* =====================================================
   REVIEW PAGE (review.html) ONLY.
   Depends on `quizResult` already being saved to localStorage
   by finishQuiz() in question.js — reads straight out of
   quizResult.answers, so questionBank.js isn't needed here.
   ===================================================== */

/* ===================== Theme toggle ===================== */
/* Same copy-per-page pattern as question.js/result.js. */
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
  // Same guard pattern as result.js — nothing to review without a finished quiz.
  window.location.href = 'index.html';
}

const { playerName, categoryLabel, difficulty, totalQuestions, correctCount, answers } = quizResult;

let currentIndex = 0;

/* ===================== Cache DOM elements ===================== */
const playerNameEl = document.querySelector('.review-player-name');
const scoreEl = document.querySelector('.review-score');

const categoryTagEl = document.querySelector('.quiz-tag');
const categoryNameEl = document.querySelector('.selected-category');
const difficultyNameEl = document.querySelector('.selected-difficulty-level');
const statusBadgeEl = document.getElementById('status-badge');

const questionTitleEl = document.querySelector('.review-question-title');
const promptEl = document.querySelector('.review-prompt');
const optionsContainerEl = document.getElementById('review-options');

const currQuestionNumberEl = document.querySelector('.curr-question-number');
const totalQuestionNumberEl = document.querySelector('.total-question-number');
const progressFillEl = document.getElementById('review-progress-fill');

const prevBtn = document.getElementById('prev-question-btn');
const nextBtn = document.getElementById('next-question-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');

/* ===================== Small inline icons ===================== */
const CHECK_ICON = `<svg class="option-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>`;
const CROSS_ICON = `<svg class="option-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="M6 6l12 12"></path></svg>`;

/* ===================== Helpers ===================== */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

/* ===================== Fill in the parts that never change per-question ===================== */
playerNameEl.textContent = playerName;
scoreEl.textContent = `${correctCount}/${totalQuestions}`;

categoryNameEl.textContent = categoryLabel + ' ';
difficultyNameEl.textContent = ' ' + capitalize(difficulty);
categoryTagEl.classList.add(`quiz-tag--${difficulty}`);

/* ===================== Render a reviewed question by index ===================== */
function renderQuestion(index) {
  const entry = answers[index]; // { question, options, correctAnswer, selectedAnswer, isCorrect }
  const wasSkipped = entry.selectedAnswer === null;

  // Status badge
  statusBadgeEl.classList.remove(
    'review-status-badge--correct',
    'review-status-badge--wrong',
    'review-status-badge--skipped'
  );

  if (wasSkipped) {
    statusBadgeEl.textContent = 'Skipped';
    statusBadgeEl.classList.add('review-status-badge--skipped');
  } else if (entry.isCorrect) {
    statusBadgeEl.textContent = 'Correct';
    statusBadgeEl.classList.add('review-status-badge--correct');
  } else {
    statusBadgeEl.textContent = 'Incorrect';
    statusBadgeEl.classList.add('review-status-badge--wrong');
  }

  // Question text
  questionTitleEl.textContent = `Question ${index + 1}`;
  promptEl.textContent = entry.question;

  // Options — rebuilt each time since the option-position was already
  // shuffled per-question when the quiz was generated, and read-only
  // review has no reusable radio inputs to reset.
  optionsContainerEl.innerHTML = '';

  entry.options.forEach((optionText, i) => {
    const isCorrectOption = optionText === entry.correctAnswer;
    const isSelectedOption = optionText === entry.selectedAnswer;

    const optionEl = document.createElement('div');
    optionEl.className = 'review-option';

    let tagText = '';
    let statusIconHtml = '';

    if (isCorrectOption) {
      optionEl.classList.add('review-option--correct');
      tagText = isSelectedOption ? 'Your answer · Correct' : 'Correct answer';
      statusIconHtml = CHECK_ICON;
    } else if (isSelectedOption) {
      optionEl.classList.add('review-option--wrong');
      tagText = 'Your answer · Incorrect';
      statusIconHtml = CROSS_ICON;
    }

    optionEl.innerHTML = `
      <span class="option-marker">${OPTION_LETTERS[i]}</span>
      <span class="option-body">
        <span class="option-text"></span>
        ${tagText ? `<span class="option-tag"></span>` : ''}
      </span>
      ${statusIconHtml}
    `;

    // Set text via textContent (not innerHTML) so question/option text is
    // never interpreted as markup, even though this data is our own.
    optionEl.querySelector('.option-text').textContent = optionText;
    if (tagText) {
      optionEl.querySelector('.option-tag').textContent = tagText;
    }

    optionsContainerEl.appendChild(optionEl);
  });

  // Counter + progress bar
  currQuestionNumberEl.textContent = index + 1;
  totalQuestionNumberEl.textContent = totalQuestions;
  progressFillEl.style.width = `${((index + 1) / totalQuestions) * 100}%`;

  // Nav button states
  prevBtn.disabled = index === 0;

  const isLastQuestion = index === totalQuestions - 1;
  nextBtn.hidden = isLastQuestion;
  backToResultsBtn.hidden = !isLastQuestion;
}

/* ===================== Event listeners ===================== */
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  }
});

/* ===================== Initial render ===================== */
renderQuestion(currentIndex);