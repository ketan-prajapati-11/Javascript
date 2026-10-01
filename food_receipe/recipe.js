// ===================== Config =====================
const API = "https://www.themealdb.com/api/json/v1/1";
const USERS_KEY = "recipeApp_users";
const SESSION_KEY = "recipeApp_loggedInUser";
const SELECTED_KEY = "selectedRecipeId"; // saved by home.js when "See recipe" is clicked

// ===================== Elements =====================
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const errorTitle = document.getElementById("error-title");
const errorText = document.getElementById("error-text");
const retryBtn = document.getElementById("retry-btn");
const recipeCard = document.getElementById("recipe-card");

const recipeName = document.getElementById("recipe-name");
const recipePic = document.getElementById("recipe-pic");
const tagsEl = document.getElementById("tags");
const factsEl = document.getElementById("facts");
const linksEl = document.getElementById("links");
const ingredientsSection = document.getElementById("ingredients-section");
const ingredientsEl = document.getElementById("ingredients");
const stepsSection = document.getElementById("steps-section");
const stepsEl = document.getElementById("steps");

const favBtn = document.getElementById("fav-btn");
const favLabel = document.getElementById("fav-label");

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

// ===================== Favorites (saved in the user's own data) =====================
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

// Add the id, or remove it if it is already saved. Returns true if now a favorite.
function toggleFavorite(id) {
  if (!currentUser) return false;
  const favs = getFavorites();
  const position = favs.indexOf(String(id));
  if (position === -1) favs.push(String(id));
  else favs.splice(position, 1);
  saveFavorites(favs);
  return position === -1;
}

function updateFavButton(isFav) {
  favBtn.classList.toggle("is-saved", isFav);
  favBtn.setAttribute("aria-pressed", String(isFav));
  favLabel.textContent = isFav ? "Saved to favorites" : "Add to favorites";
}

// ===================== Recipe id =====================
// 1) recipe.html?id=52771   2) the id saved by home.js in localStorage
let recipeId = null;

function getRecipeId() {
  const fromUrl = new URLSearchParams(window.location.search).get("id");
  const id = (fromUrl || safeStorageGet(SELECTED_KEY) || "").trim();
  return /^\d+$/.test(id) ? id : null;
}

// ===================== Turn API data into page content =====================
// The API has strIngredient1..20 and strMeasure1..20. Empty ones are "", " " or null.
function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const name = String(meal[`strIngredient${i}`] || "").trim();
    if (!name) continue;
    const measure = String(meal[`strMeasure${i}`] || "").trim();
    list.push({ name, measure });
  }
  return list;
}

// strInstructions is one long text with line breaks and "step 1" labels.
function splitInstructions(text) {
  return String(text || "")
    .split(/\r?\n+/)
    .map((line) => line.trim())
    // drop lines that are only a label: "step 1", "1", "2."
    .filter((line) => line && !/^(step\s*)?\d+\s*[.:)-]?$/i.test(line))
    // drop a leading "step 3" / "3." from the actual sentence
    .map((line) => line.replace(/^step\s*\d+\s*[.:)-]?\s*/i, "").replace(/^\d+[.)]\s+/, ""))
    .filter(Boolean);
}

function getTags(meal) {
  const raw = [meal.strCategory, meal.strArea];
  if (meal.strTags) raw.push(...String(meal.strTags).split(","));
  const clean = raw.map((t) => String(t || "").trim()).filter(Boolean);
  return [...new Set(clean)].slice(0, 6);
}

function plural(count, word) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(String(value || "").trim());
}

function createLink(href, text) {
  const a = document.createElement("a");
  a.className = "pill-btn";
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = text;
  return a;
}

function renderRecipe(meal) {
  document.title = `${meal.strMeal} | Meal Recipe`;
  recipeName.textContent = meal.strMeal;
  recipePic.src = meal.strMealThumb;
  recipePic.alt = meal.strMeal;

  // tags (strCategory, strArea and strTags when the recipe has them)
  tagsEl.innerHTML = "";
  getTags(meal).forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    tagsEl.appendChild(li);
  });
  tagsEl.hidden = !tagsEl.children.length;

  // ingredients
  const ingredients = getIngredients(meal);
  ingredientsEl.innerHTML = "";
  ingredients.forEach(({ name, measure }) => {
    const li = document.createElement("li");
    li.className = "ingredient";

    const img = document.createElement("img");
    img.src = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-small.png`;
    img.alt = "";
    img.loading = "lazy";
    img.addEventListener("error", () => img.remove()); // no picture for this one

    const text = document.createElement("div");
    text.className = "ingredient-text";
    const nameEl = document.createElement("div");
    nameEl.className = "ingredient-name";
    nameEl.textContent = name;
    text.appendChild(nameEl);
    if (measure) {
      const measureEl = document.createElement("div");
      measureEl.className = "ingredient-measure";
      measureEl.textContent = measure;
      text.appendChild(measureEl);
    }

    li.append(img, text);
    ingredientsEl.appendChild(li);
  });
  ingredientsSection.hidden = ingredients.length === 0;

  // instructions
  const steps = splitInstructions(meal.strInstructions);
  stepsEl.innerHTML = "";
  steps.forEach((step) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = step;
    li.appendChild(p);
    stepsEl.appendChild(li);
  });
  stepsSection.hidden = steps.length === 0;

  // facts + extra links
  const facts = [];
  if (ingredients.length) facts.push(plural(ingredients.length, "ingredient"));
  if (steps.length) facts.push(plural(steps.length, "step"));
  factsEl.textContent = facts.join(", ");
  factsEl.hidden = facts.length === 0;

  linksEl.innerHTML = "";
  if (isHttpUrl(meal.strYoutube)) linksEl.appendChild(createLink(meal.strYoutube.trim(), "Watch video"));
  // if (isHttpUrl(meal.strSource)) linksEl.appendChild(createLink(meal.strSource.trim(), "Original source"));
}
// 
// ===================== Page states =====================
function showLoading() {
  loadingEl.hidden = false;
  errorEl.hidden = true;
  recipeCard.hidden = true;
  favBtn.disabled = true;
}

function showError(title, text, canRetry) {
  loadingEl.hidden = true;
  recipeCard.hidden = true;
  errorTitle.textContent = title;
  errorText.textContent = text;
  retryBtn.hidden = !canRetry;
  errorEl.hidden = false;
  favBtn.disabled = true;
}

function showRecipe() {
  loadingEl.hidden = true;
  errorEl.hidden = true;
  recipeCard.hidden = false;
  favBtn.disabled = false;
}

async function loadRecipe() {
  recipeId = getRecipeId();
  if (!recipeId) {
    showError("No recipe selected", "Pick a recipe from the home page to see it here.", false);
    return;
  }
  safeStorageSet(SELECTED_KEY, recipeId); // keep them in sync

  showLoading();
  try {
    const data = await fetchJSON(`${API}/lookup.php?i=${encodeURIComponent(recipeId)}`);
    const meal = data && data.meals && data.meals[0];

    if (!meal || !meal.idMeal || !meal.strMeal) {
      showError("Recipe not found", "We could not find a recipe with that id.", false);
      return;
    }

    renderRecipe(meal);
    updateFavButton(getFavorites().includes(String(meal.idMeal)));
    showRecipe();
  } catch (err) {
    console.error("Recipe failed:", err);
    showError(
      "Could not load the recipe",
      "Please check your internet connection and try again.",
      true,
    );
  }
}

retryBtn.addEventListener("click", loadRecipe);

// Add to favorites / click again to remove
favBtn.addEventListener("click", () => {
  if (!recipeId) return;
  updateFavButton(toggleFavorite(recipeId));
});

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
  loadRecipe();
}