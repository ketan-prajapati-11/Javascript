// ===================== starting here =====================
const API = "https://www.themealdb.com/api/json/v1/1";
const RANDOM_COUNT = 50; // unique random recipes on the home screen
const SEARCH_DELAY = 400; // ms to wait after typing before searching

// localStorage keys (USERS_KEY and SESSION_KEY are the ones used by login/signup)
const USERS_KEY = "recipeApp_users";
const SESSION_KEY = "recipeApp_loggedInUser";
const SELECTED_KEY = "selectedRecipeId"; // read this on recipe.html

const HEART_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

// ===================== Elements =====================
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const categoryContainer = document.getElementById("category-container");
const recipeContainer = document.getElementById("recipe-container");
const viewAllBtn = document.getElementById("view-all");
const sectionTitle = document.getElementById("section-title");
const resetBtn = document.getElementById("reset-btn");
const statusEl = document.getElementById("status");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-bar");
const searchClear = document.getElementById("search-clear");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const catNav = document.getElementById("cat-nav");
const profileBtn = document.getElementById("profile-btn");
const profileMenu = document.getElementById("profile-menu");

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

// ===================== Fetch helpers =====================
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

// A meal is only shown if it has the data a card needs
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

// ===================== Logged-in user =====================
// login.js saves the user in SESSION_KEY. No user = back to the login page.
const currentUser = readJSON(SESSION_KEY, null);
if (!currentUser || !currentUser.email) {
  window.location.replace("login.html");
}

// ---- Profile (photo, or first letter of the name) ----
function renderProfile(user) {
  if (!user) return;
  const avatar = document.getElementById("avatar");
  const name = user.username || "User";
  const initial = name.trim().charAt(0).toUpperCase() || "U";

  document.getElementById("profile-name").textContent = name;
  document.getElementById("profile-email").textContent = user.email || "";

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
renderProfile(currentUser);

function setProfileMenu(open) {
  profileMenu.hidden = !open;
  profileBtn.setAttribute("aria-expanded", String(open));
}
profileBtn.addEventListener("click", () => window.location.replace("profile.html"));

//================================================================
// ===================== Favorites (saved inside the user's own data) =====================
// Each user object in USERS_KEY gets a `favoriteRecipes` array of meal ids:
// { username, email, photoUrl, password, favoriteRecipes: ["52771", "52772"] }
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
  // 1) the user's record in the "database"
  const users = readJSON(USERS_KEY, []);
  const index = findUserIndex(users, currentUser.email);
  if (index > -1) {
    users[index].favoriteRecipes = list;
    safeStorageSet(USERS_KEY, JSON.stringify(users));
  }
  // 2) the copy kept for the logged-in session
  currentUser.favoriteRecipes = list;
  safeStorageSet(SESSION_KEY, JSON.stringify(currentUser));
}

// Like -> add the id. Like again -> remove it. Returns true if now a favorite.
function toggleFavorite(id) {
  if (!currentUser) return false;
  const favs = getFavorites();
  const position = favs.indexOf(String(id));
  if (position === -1) favs.push(String(id));
  else favs.splice(position, 1);
  saveFavorites(favs);
  return position === -1;
}

function updateLikeButton(btn, isFav) {
  btn.classList.toggle("active", isFav);
  btn.setAttribute("aria-pressed", String(isFav));
  btn.setAttribute("aria-label", isFav ? "Remove from favorites" : "Add to favorites");
}

// ===================== Status + loading placeholders =====================
function setStatus(message = "") {
  statusEl.textContent = message;
  statusEl.hidden = !message;
  if (message) recipeContainer.innerHTML = ""; // remove loading placeholders
}

function showSkeletons(count = 8) {
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

// ===================== Categories =====================
function createCategoryItem(cat) {
  const li = document.createElement("li");
  li.className = "category-list";
  li.dataset.name = cat.strCategory;
  li.tabIndex = 0;
  li.setAttribute("role", "button");

  const imgWrap = document.createElement("span");
  imgWrap.className = "category-img";

  const img = document.createElement("img");
  img.src = cat.strCategoryThumb;
  img.alt = cat.strCategory;
  img.loading = "lazy";

  const name = document.createElement("h4");
  name.className = "category-name";
  name.textContent = cat.strCategory;

  imgWrap.appendChild(img);
  li.append(imgWrap, name);
  return li;
}

 async function displayCategory() {
  try {
    const data = await fetchJSON(`${API}/categories.php`);
    const categories = (data.categories || []).filter(
      (c) => c && c.strCategory && c.strCategoryThumb,
    );
    const fragment = document.createDocumentFragment();
    categories.forEach((c) => fragment.appendChild(createCategoryItem(c)));
    categoryContainer.appendChild(fragment);
  } catch (err) {
    console.error("Categories failed:", err);
    categoryContainer.innerHTML =
      '<li class="category-error">Could not load categories. Please refresh the page.</li>';
  }
}

// View all / Show less
viewAllBtn.addEventListener("click", () => {
  const expanded = categoryContainer.classList.toggle("expanded");
  viewAllBtn.setAttribute("aria-expanded", String(expanded));
  viewAllBtn.textContent = expanded ? "Show less" : "View all";
  catNav.hidden = expanded; // arrows only make sense in scroll mode
  if (!expanded) categoryContainer.scrollLeft = 0;
});

function selectCategory(item) {
  const name = item.dataset.name;
  sectionTitle.scrollIntoView({ behavior: "smooth", block: "start" });
  if (item.classList.contains("active")) {
    showRandomRecipes(false); // clicking the active category again clears it
  } else {
    showCategoryRecipes(name);
  }
}
categoryContainer.addEventListener("click", (e) => {
  const item = e.target.closest(".category-list");
  if (item) selectCategory(item);
});
categoryContainer.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const item = e.target.closest(".category-list");
  if (item) {
    e.preventDefault();
    selectCategory(item);
  }
});

function setActiveCategory(name) {
  categoryContainer.querySelectorAll(".category-list").forEach((li) => {
    const active = li.dataset.name === name;
    li.classList.toggle("active", active);
    li.setAttribute("aria-pressed", String(active));
  });
}

// ===================== Food card =====================
function createFoodCard(meal, favs) {
  const card = document.createElement("div");
  card.className = "food-card";
  card.dataset.id = meal.idMeal;

  // image
  const imgWrap = document.createElement("div");
  imgWrap.className = "food-img";
  const img = document.createElement("img");
  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  img.loading = "lazy";
  img.addEventListener("error", () => card.remove()); // broken image -> drop the card
  imgWrap.appendChild(img);

  // tags: only strCategory and strArea
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

  // "See recipe" is a real link: recipe.html?id=52771
  // (the id is also saved in localStorage when clicked, see the click handler)
  const see = document.createElement("a");
  see.className = "see-recipe";
  see.href = `recipe.html?id=${encodeURIComponent(meal.idMeal)}`;
  see.dataset.id = meal.idMeal;
  see.textContent = "See recipe"; // arrow is added in CSS

  // favorite button
  const like = document.createElement("button");
  like.type = "button";
  like.className = "like-img";
  like.innerHTML = HEART_SVG;
  like.dataset.id = meal.idMeal;
  updateLikeButton(like, favs.has(String(meal.idMeal)));

  const cardBody = document.createElement("div");
  cardBody.className = "food-body";
  cardBody.append(tags, name, see);

  card.append(imgWrap, cardBody, like);
  return card;
}

// One listener for every card button
recipeContainer.addEventListener("click", (e) => {
  const like = e.target.closest(".like-img");
  if (like) {
    updateLikeButton(like, toggleFavorite(like.dataset.id));
    return;
  }
  const see = e.target.closest(".see-recipe");
  if (see) {
    // remember which recipe was clicked, then the link opens recipe.html
    safeStorageSet(SELECTED_KEY, see.dataset.id);
  }
});

function renderMeals(meals) {
  recipeContainer.innerHTML = "";
  const favs = new Set(getFavorites());
  const fragment = document.createDocumentFragment();
  meals
    .filter(isValidMeal)
    .forEach((m) => fragment.appendChild(createFoodCard(m, favs)));
  recipeContainer.appendChild(fragment);
}

// ===================== Loading recipes =====================
let requestId = 0; 
let mode = "random"; 
let randomMeals = []; 
let searchTimer = null;

function setResetButton(showBack) {
  resetBtn.textContent = showBack ? "\u2190 Back to random recipes" : "Shuffle recipes";
}

function startLoading(title, showBack) {
  const id = ++requestId;
  sectionTitle.textContent = title;
  setResetButton(showBack);
  setStatus("");
  // showSkeletons();
  return id;
}

function clearSearchInput() {
  searchInput.value = "";
  searchClear.hidden = true;
}

// random.php returns ONE meal per call, so call it several times
// and keep only unique ids.
async function getRandomMeals(target) {
  const unique = new Map();
  for (let round = 0; round < 5 && unique.size < target; round++) {
    const needed = target - unique.size;
    const results = await Promise.allSettled(
      Array.from({ length: needed }, () =>
        fetchJSON(`${API}/random.php`, { cache: "no-store" }),
      ),
    );
    results.forEach((r) => {
      if (r.status !== "fulfilled") return;
      const meal = r.value && r.value.meals && r.value.meals[0];
      if (isValidMeal(meal)) unique.set(meal.idMeal, meal);
    });
  }
  return [...unique.values()];
}

// forceNew = true -> fetch a fresh random set
// forceNew = false -> reuse the last random set if we already have one
async function showRandomRecipes(forceNew = false) {
  mode = "random";
  setActiveCategory(null);
  clearSearchInput();

  if (!forceNew && randomMeals.length) {
    requestId++; // cancel anything still loading
    sectionTitle.textContent = "Explore Recipes";
    setResetButton(false);
    setStatus("");
    renderMeals(randomMeals);
    return;
  }

  const id = startLoading("Explore Recipes", false);
  try {
    const meals = await getRandomMeals(RANDOM_COUNT);
    if (id !== requestId) return;
    if (!meals.length) {
      setStatus("Could not load recipes. Please try again.");
      return;
    }
    randomMeals = meals;
    setStatus("");
    renderMeals(meals);
  } catch (err) {
    if (id !== requestId) return;
    console.error(err);
    setStatus("Something went wrong while loading recipes. Please try again.");
  }
}
//----
async function showCategoryRecipes(category) {
  mode = "category";
  const id = startLoading(`${category} Recipes`, true);
  setActiveCategory(category);
  clearSearchInput();
  try {
    const list = await fetchJSON(
      `${API}/filter.php?c=${encodeURIComponent(category)}`,
    );
    if (id !== requestId) return;
    const basic = (list.meals || []).filter(isValidMeal);
    if (!basic.length) {
      setStatus(`No recipes found in ${category}.`);
      return;
    }

    const details = await Promise.allSettled(
      basic.map((m) => fetchJSON(`${API}/lookup.php?i=${m.idMeal}`)),
    );
    if (id !== requestId) return;

    const meals = basic.map((m, i) => {
      const r = details[i];
      const full = r.status === "fulfilled" && r.value.meals && r.value.meals[0];
      return isValidMeal(full) ? full : { ...m, strCategory: category };
    });

    setStatus("");
    renderMeals(meals);
  } catch (err) {
    if (id !== requestId) return;
    console.error(err);
    setStatus(`Could not load ${category} recipes. Please try again.`);
  }
}

// ===================== Search =====================
// TheMealDB matches the WHOLE text inside a recipe name, so "chicken curry"
// would miss "Curry Chicken". We search every word separately, merge the
// results and put the recipes that match the most words first.
async function searchRecipes(term) {
  mode = "search";
  const id = startLoading(`Results for "${term}"`, true);
  setActiveCategory(null);

  const words = [...new Set(term.toLowerCase().split(/\s+/).filter(Boolean))].slice(0, 4);

  try {
    const results = await Promise.allSettled(
      words.map((w) => fetchJSON(`${API}/search.php?s=${encodeURIComponent(w)}`)),
    );
    if (id !== requestId) return;

    const succeeded = results.filter((r) => r.status === "fulfilled");
    if (!succeeded.length) {
      setStatus("Search failed. Please check your connection and try again.");
      return;
    }

    const unique = new Map();
    succeeded.forEach((r) => {
      (r.value.meals || []).forEach((m) => {
        if (isValidMeal(m)) unique.set(m.idMeal, m);
      });
    });

    const ranked = [...unique.values()]
      .map((meal) => {
        const title = meal.strMeal.toLowerCase();
        return {
          meal,
          score: words.filter((w) => title.includes(w)).length,
          startsWith: title.startsWith(words[0]) ? 1 : 0,
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.startsWith - a.startsWith ||
          a.meal.strMeal.localeCompare(b.meal.strMeal),
      )
      .map((x) => x.meal);

    if (!ranked.length) {
      setStatus(`No recipes found for "${term}". Try a different word.`);
      return;
    }
    setStatus("");
    renderMeals(ranked);
  } catch (err) {
    if (id !== requestId) return;
    console.error(err);
    setStatus("Search failed. Please try again.");
  }
}

// Cancel the search -> random cards come back
function cancelSearch() {
  clearTimeout(searchTimer);
  clearSearchInput();
  if (mode === "search") showRandomRecipes(false);
}

// search while typing
searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim();
  searchClear.hidden = !searchInput.value;
  clearTimeout(searchTimer);

  if (!term) {
    if (mode === "search") showRandomRecipes(false); // input emptied
    return;
  }
  if (term.length < 2) return; // wait for at least 2 letters
  searchTimer = setTimeout(() => searchRecipes(term), SEARCH_DELAY);
});

// Enter / Search button searches right away
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimeout(searchTimer);
  const term = searchInput.value.trim();
  if (term) searchRecipes(term);
  else if (mode !== "random") showRandomRecipes(false);
});

searchClear.addEventListener("click", () => {
  cancelSearch();
  searchInput.focus();
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && searchInput.value) cancelSearch();
});

// "Shuffle" in random mode gives new recipes, otherwise go back to the last random set
resetBtn.addEventListener("click", () => showRandomRecipes(mode === "random"));

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
  const link = e.target.closest("a");
  if (!link) return;
  navMenu.querySelectorAll("li").forEach((li) => li.classList.remove("active"));
  link.closest("li").classList.add("active");
  setMenu(false);
});

// click outside, or Escape, closes the menus
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header_section")) setMenu(false);
  if (!e.target.closest(".profile-wrap")) setProfileMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    setMenu(false);
    setProfileMenu(false);
  }
});

window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

// ===================== Category arrows =====================
function scrollCategories(direction) {
  categoryContainer.scrollBy({
    left: direction * categoryContainer.clientWidth * 0.8,
    behavior: "smooth",
  });
}
document.getElementById("cat-prev").addEventListener("click", () => scrollCategories(-1));
document.getElementById("cat-next").addEventListener("click", () => scrollCategories(1));

// ===================== Start =====================
if (currentUser) {
  displayCategory();
  showRandomRecipes(true);
}