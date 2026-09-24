
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
//
// ===================== Theme toggle (unchanged) =====================
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

// ===================== Login Validation =====================

const USERS_KEY = 'recipeApp_users';

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function validateLogin(email, password) {
    const users = getUsers();
    return users.find(
        user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
}

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    const matchedUser = validateLogin(email, password);

    if (matchedUser) {
        // Store the logged-in user's session so homepage.html can greet them
        localStorage.setItem('recipeApp_loggedInUser', JSON.stringify(matchedUser));
        window.location.href = 'homepage.html';
    } else {
        alert('Incorrect email or password. Please try again.');
    }
});

// ===================== "Click here" -> Sign Up redirect =====================
const signupLink = document.querySelector('.newUser a');
if (signupLink) {
    signupLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'signup.html';
    });
}
