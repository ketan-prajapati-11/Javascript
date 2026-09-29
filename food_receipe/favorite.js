// ===================== Config =====================
const API = "https://www.themealdb.com/api/json/v1/1";
const USERS_KEY = "recipeApp_users";
const SESSION_KEY = "recipeApp_loggedInUser";
const SELECTED_KEY = "selectedRecipeId"; // read this on recipe.html

const HEART_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

// ===================== Elements =====================
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const recipeContainer = document.getElementById("recipe-container");
const statusEl = document.getElementById("status");
const emptyEl = document.getElementById("empty");
const favCount = document.getElementById("fav-count");

// ===================== Storage helpers =====================
function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable, ignore */
  }
}
function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

function isValidMeal(m) {
  return Boolean(m && m.idMeal && m.strMeal && m.strMealThumb);
}

// ===================== Theme toggle (light / dark) =====================
const applyTheme = (isDark) => {
  body.classList.toggle("darkmode", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

const savedTheme = safeStorageGet("theme");
if (savedTheme === "dark") applyTheme(true);
else if (savedTheme === "light") applyTheme(false);
else applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);

themeToggle.addEventListener("click", () => {
  const isDark = !body.classList.contains("darkmode");
  applyTheme(isDark);
  safeStorageSet("theme", isDark ? "dark" : "light");
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!safeStorageGet("theme")) applyTheme(e.matches);
  });

// ===================== Logged-in user + header avatar =====================
const currentUser = readJSON(SESSION_KEY, null);
if (!currentUser || !currentUser.email) {
  window.location.replace("login.html");
}

function renderHeaderProfile(user) {
  const name = user.username || "User";
  const initial = name.trim().charAt(0).toUpperCase() || "U";
  const avatar = document.getElementById("avatar");
  document.getElementById("profile-name").textContent = name;

  const showInitial = () => {
    avatar.textContent = initial;
  };
  const photo = (user.photoUrl || "").trim();
  if (/^(https?:\/\/|data:image\/)/i.test(photo)) {
    const img = document.createElement("img");
    img.alt = name;
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", showInitial); // broken link -> use the letter
    img.src = photo;
    avatar.textContent = "";
    avatar.appendChild(img);
  } else {
    showInitial();
  }
}

// ===================== Favorites (stored in the user's data) =====================
function findUserIndex(users, email) {
  return users.findIndex(
    (u) =>
      u && typeof u.email === "string" && u.email.toLowerCase() === email.toLowerCase(),
  );
}

function getFavorites() {
  if (!currentUser) return [];
  const users = readJSON(USERS_KEY, []);
  const index = findUserIndex(users, currentUser.email);
  const list = index > -1 ? users[index].favoriteRecipes : currentUser.favoriteRecipes;
  return Array.isArray(list) ? list.map(String) : [];
}

function saveFavorites(list) {
  const users = readJSON(USERS_KEY, []);
  const index = findUserIndex(users, currentUser.email);
  if (index > -1) {
    users[index].favoriteRecipes = list;
    safeStorageSet(USERS_KEY, JSON.stringify(users));
  }
  currentUser.favoriteRecipes = list;
  safeStorageSet(SESSION_KEY, JSON.stringify(currentUser));
}

function removeFavorite(id) {
  saveFavorites(getFavorites().filter((fav) => fav !== String(id)));
}

// ===================== Food card (same design as home) =====================
function createFoodCard(meal) {
  const card = document.createElement("div");
  card.className = "food-card";
  card.dataset.id = meal.idMeal;

  const imgWrap = document.createElement("div");
  imgWrap.className = "food-img";
  const img = document.createElement("img");
  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  img.loading = "lazy";
  img.addEventListener("error", () => {
    card.remove(); // broken image -> drop the card
    refreshState();
  });
  imgWrap.appendChild(img);

  const tags = document.createElement("ul");
  tags.className = "sub-category";
  [meal.strCategory, meal.strArea].filter(Boolean).forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    tags.appendChild(li);
  });

  const name = document.createElement("div");
  name.className = "food-name";
  name.textContent = meal.strMeal;
  name.title = meal.strMeal;

  const see = document.createElement("a");
  see.className = "see-recipe";
  see.href = `recipe.html?id=${encodeURIComponent(meal.idMeal)}`;
  see.dataset.id = meal.idMeal;
  see.textContent = "See recipe";

  // every card here is a favorite, so the heart starts filled
  const like = document.createElement("button");
  like.type = "button";
  like.className = "like-img active";
  like.innerHTML = HEART_SVG;
  like.dataset.id = meal.idMeal;
  like.setAttribute("aria-pressed", "true");
  like.setAttribute("aria-label", "Remove from favorites");

  const cardBody = document.createElement("div");
  cardBody.className = "food-body";
  cardBody.append(tags, name, see);

  card.append(imgWrap, cardBody, like);
  return card;
}

recipeContainer.addEventListener("click", (e) => {
  const like = e.target.closest(".like-img");
  if (like) {
    // un-liking removes the recipe from the user's saved favorites
    removeFavorite(like.dataset.id);
    like.closest(".food-card").remove();
    refreshState();
    return;
  }
  const see = e.target.closest(".see-recipe");
  if (see) safeStorageSet(SELECTED_KEY, see.dataset.id);
});

// ===================== Loading + states =====================
function showSkeletons(count) {
  recipeContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.className = "food-card skeleton";
    card.setAttribute("aria-hidden", "true");
    card.innerHTML =
      '<div class="food-img"></div><div class="food-body"><div class="sk-line short"></div><div class="sk-line"></div><div class="sk-line"></div></div>';
    fragment.appendChild(card);
  }
  recipeContainer.appendChild(fragment);
}

function setStatus(message = "") {
  statusEl.textContent = message;
  statusEl.hidden = !message;
}

// update the count badge and the "no favorites" message
function refreshState() {
  const total = recipeContainer.querySelectorAll(".food-card:not(.skeleton)").length;
  favCount.textContent = String(total);
  favCount.hidden = total === 0;
  emptyEl.hidden = total > 0 || !statusEl.hidden;
}

async function loadFavorites() {
  const ids = getFavorites().reverse(); // newest first
  if (!ids.length) {
    recipeContainer.innerHTML = "";
    refreshState();
    return;
  }

  showSkeletons(Math.min(ids.length, 8));

  const results = await Promise.allSettled(
    ids.map((id) => fetchJSON(`${API}/lookup.php?i=${encodeURIComponent(id)}`)),
  );

  const meals = results
    .map((r) => (r.status === "fulfilled" && r.value.meals ? r.value.meals[0] : null))
    .filter(isValidMeal);

  recipeContainer.innerHTML = "";

  if (!meals.length) {
    setStatus("Could not load your favorite recipes. Check your connection and refresh the page.");
    return;
  }

  const fragment = document.createDocumentFragment();
  meals.forEach((m) => fragment.appendChild(createFoodCard(m)));
  recipeContainer.appendChild(fragment);

  if (meals.length < ids.length) {
    setStatus("Some of your favorites could not be loaded right now.");
  }
  refreshState();
}

// ===================== Mobile menu (burger) =====================
function setMenu(open) {
  navMenu.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(!navMenu.classList.contains("open"));
});
navMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header_section")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

// ===================== Start =====================
if (currentUser) {
  renderHeaderProfile(currentUser);
  loadFavorites();
}