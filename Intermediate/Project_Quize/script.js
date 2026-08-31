// let darkBtn = document.querySelector('.dark-btn');
// let body = document.querySelector('body');

// // 1. Decide the initial theme:
// //    - If the user already picked a theme before (saved in localStorage), use that.
// //    - Otherwise, fall back to the OS/browser's preferred color scheme.
// const savedTheme = localStorage.getItem('theme');

// if (savedTheme === 'dark') {
//   body.classList.add('darkmode');
// } else if (savedTheme === 'light') {
//   body.classList.remove('darkmode');
// } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   // no saved preference yet -> use system default
//   body.classList.add('darkmode');
// }

// // 2. Toggle theme on click and save the choice
// darkBtn.addEventListener('click', () => {
//   body.classList.toggle('darkmode');

//   if (body.classList.contains('darkmode')) {
//     localStorage.setItem('theme', 'dark');
//   } else {
//     localStorage.setItem('theme', 'light');
//   }
// });

// // 3. (Optional but nice) If the user hasn't manually chosen a theme yet,
// //    keep following the OS theme live if they change it in Windows settings.
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
//   if (!localStorage.getItem('theme')) {
//     body.classList.toggle('darkmode', e.matches);
//   }
// });

const themeToggle = document.querySelector('.theme-toggle');
const body = document.querySelector('body');

const applyTheme = (isDark) => {
  body.classList.toggle('darkmode', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
};

// 1. Initial theme: saved choice wins, otherwise fall back to OS preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  applyTheme(true);
} else if (savedTheme === 'light') {
  applyTheme(false);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

// 2. Toggle on click and remember the choice
themeToggle.addEventListener('click', () => {
  const isDark = !body.classList.contains('darkmode');
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 3. Follow the OS theme live, but only until the user picks one manually
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches);
  }
});