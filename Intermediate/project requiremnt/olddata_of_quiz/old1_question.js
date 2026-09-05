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

/* ===================== Build this session's question set ===================== */
const availableQuestions = getQuestions(categoryLabel, difficulty); // global from questionBank.js
const totalQuestions = Math.min(questionCount, availableQuestions.length);
const questions = availableQuestions.slice(0, totalQuestions);

// One slot per question in this session. Stays `null` until the user
// clicks Save & Continue on that question.
const userAnswers = new Array(totalQuestions).fill(null);

let currentIndex = 0;

/* ===================== Cache DOM elements ===================== */
const playerNameEl = document.querySelector('.question-player-name');
const categoryTagEl = document.querySelector('.quiz-tag');
const categoryNameEl = document.querySelector('.selected-category');
const difficultyNameEl = document.querySelector('.selected-difficulty-level');

const questionTitleEl = document.querySelector('.question-title');
const questionPromptEl = document.querySelector('.question-prompt');
const optionEls = document.querySelectorAll('.question-option');

const currQuestionNumberEl = document.querySelector('.curr-question-number');
const totalQuestionNumberEl = document.querySelector('.total-question-number');
const progressFillEl = document.querySelector('.question-progress-fill');

const prevBtn = document.getElementById('prev-question-btn');
const nextBtn = document.getElementById('next-question-btn');
const saveContinueBtn = document.getElementById('save-continue-btn');

/* ===================== Helpers ===================== */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

  // Answer options — reset each one, fill in this question's text/value,
  // and restore a previously saved answer for this question if there is one
  optionEls.forEach((optionEl, i) => {
    const input = optionEl.querySelector('input[type="radio"]');
    const textEl = optionEl.querySelector('.option-text');

    const optionValue = q.options[i];
    textEl.textContent = optionValue;
    input.value = optionValue;
    input.checked = userAnswers[index] === optionValue;
  });

  // "Question X of Y" + progress bar
  currQuestionNumberEl.textContent = index + 1;
  totalQuestionNumberEl.textContent = totalQuestions;
  progressFillEl.style.width = `${((index + 1) / totalQuestions) * 100}%`;

  // Nav button states
  prevBtn.disabled = index === 0;

  const isLastQuestion = index === totalQuestions - 1;
  nextBtn.disabled = isLastQuestion;
  saveContinueBtn.textContent = isLastQuestion ? 'Finish Quiz' : 'Save & Continue';
}

/* ===================== Score tally (recomputed fresh each time) ===================== */
function logScore(justAnsweredIndex, isCorrect, selectedAnswer) {
  const q = questions[justAnsweredIndex];

  let correctCount = 0;
  let answeredCount = 0;

  userAnswers.forEach((answer, i) => {
    if (answer !== null) {
      answeredCount++;
      if (checkAnswer(questions[i], answer)) correctCount++;
    }
  });

  const wrongCount = answeredCount - correctCount;

  console.log(
    `Question ${justAnsweredIndex + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}` +
      ` — your answer: "${selectedAnswer}", correct answer: "${q.answer}"`
  );
  console.log(`Score so far: ${correctCount} correct, ${wrongCount} incorrect, out of ${answeredCount} answered`);

  if (justAnsweredIndex === totalQuestions - 1) {
    console.log(`Quiz complete! Final score: ${correctCount} / ${totalQuestions}`);
  }
}

/* ===================== Event listeners ===================== */
saveContinueBtn.addEventListener('click', () => {
  const checkedInput = document.querySelector('.question-option input[type="radio"]:checked');

  if (!checkedInput) {
    alert('Please select an answer before continuing.');
    return;
  }

  const selectedAnswer = checkedInput.value;
  userAnswers[currentIndex] = selectedAnswer;

  const isCorrect = checkAnswer(questions[currentIndex], selectedAnswer); // global from questionBank.js
  logScore(currentIndex, isCorrect, selectedAnswer);

  const isLastQuestion = currentIndex === totalQuestions - 1;
  if (isLastQuestion) {
    return; // nothing further to navigate to — final score is already logged above
  }

  currentIndex++;
  renderQuestion(currentIndex);
});

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