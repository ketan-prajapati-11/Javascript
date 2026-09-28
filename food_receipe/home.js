// ===================== Theme toggle(LIght / Dark Mode) =====================
const themeToggle = document.querySelector(".theme-toggle");
const body = document.querySelector("body");

const applyTheme = (isDark) => {
  body.classList.toggle("darkmode", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
};

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  applyTheme(true);
} else if (savedTheme === "light") {
  applyTheme(false);
} else {
  applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
}

themeToggle.addEventListener("click", () => {
  const isDark = !body.classList.contains("darkmode");
  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  });

//=========== creating category list ==============

function categoryCard(image, name) {
  let categoryContainer = document.querySelector(".category-container");

  let categoryList = document.createElement("li");
  categoryList.classList.add("category-list");

  let categoryImg = document.createElement("span");
  categoryImg.classList.add("category-img");

  let images = document.createElement("img");
  images.src = `${image}`;
  images.alt = "Dessert Category";

  let categoryName = document.createElement("h4");
  categoryName.classList.add("category-name");
  categoryName.textContent = `${name}`;

  categoryImg.appendChild(images);
  categoryList.appendChild(categoryImg);
  categoryList.appendChild(categoryName);

  categoryContainer.appendChild(categoryList);
}
//============= fetching the category iteams ===========

async function displayCategory() {
  const categoryData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );
  const response = await categoryData.json();
  console.log(response);

  let categoryContainer = document.querySelector(".category-container");
  let fragment = document.createDocumentFragment();

  response.categories.forEach((e) => {
    //   console.log(e.strCategory)
    //   console.log(e.strCategoryThumb)

    let categoryList = document.createElement("li");
    categoryList.classList.add("category-list");

    let categoryImg = document.createElement("span");
    categoryImg.classList.add("category-img");

    let image = document.createElement("img");
    image.src = `${e.strCategoryThumb}`;
    image.alt = "Dessert Category";

    let categoryName = document.createElement("h4");
    categoryName.classList.add("category-name");
    categoryName.textContent = `${e.strCategory}`;

    categoryImg.appendChild(image);
    categoryList.appendChild(categoryImg);
    categoryList.appendChild(categoryName);

    fragment.appendChild(categoryList);
  });
  categoryContainer.appendChild(fragment);
}
displayCategory();

//============= food card ================

let recipeContainer = document.querySelector(".racipe-container");

let fragment = document.createDocumentFragment();

let foodCard = document.createElement("div");
foodCard.classList.add("food-card");

let foodImg = document.createElement("div");
foodImg.classList.add("food-img");
let image = document.createElement("img");
image.src = "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg";

let subCategory = document.createElement("div");
subCategory.classList.add("sub-category");

let subList = document.createElement("li");
subList.textContent = "Maxicanwebgii";

let foodName = document.createElement("div");
foodName.classList.add("food-name");
foodName.textContent = "Ketans special Penne ";

let seeRecipeBtn = document.createElement("div");
seeRecipeBtn.classList.add("see-recipe");
seeRecipeBtn.textContent = "See Recipe ";

foodImg.appendChild(image);
subCategory.appendChild(subList);

foodCard.appendChild(foodImg);
foodCard.appendChild(subCategory);
foodCard.appendChild(foodName);
foodCard.appendChild(seeRecipeBtn);

let likeImg = document.createElement("div");
likeImg.classList.add("like-img");

likeImg.innerHTML = `<svg xmlns="http://w3.org" viewBox="0 0 24 24" width="100" height="100">
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="transparent" stroke="#212121" stroke-width="1" />
                    </svg>`;
foodCard.appendChild(likeImg);

fragment.appendChild(foodCard);
recipeContainer.appendChild(fragment);

//=============== fetching recipe foods ==================

//============= fetching the category iteams ===========

async function displayRandomFood() {
  const categoryData = await fetch(
    "",
  );
  const response = await categoryData.json();
  console.log(response);

  let recipeContainer = document.querySelector(".racipe-container");

  let fragment = document.createDocumentFragment();

  response.categories.forEach((e) => {
    //   console.log(e.strCategory)
    //   console.log(e.strCategoryThumb)

    let foodCard = document.createElement("div");
    foodCard.classList.add("food-card");

    let foodImg = document.createElement("div");
    foodImg.classList.add("food-img");
    let image = document.createElement("img");
    image.src =
      "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg";

    let subCategory = document.createElement("div");
    subCategory.classList.add("sub-category");

    let subList = document.createElement("li");
    subList.textContent = "Maxicanwebgii";

    let foodName = document.createElement("div");
    foodName.classList.add("food-name");
    foodName.textContent = "Ketans special Penne ";

    let seeRecipeBtn = document.createElement("div");
    seeRecipeBtn.classList.add("see-recipe");
    seeRecipeBtn.textContent = "See Recipe ";

    foodImg.appendChild(image);
    subCategory.appendChild(subList);

    foodCard.appendChild(foodImg);
    foodCard.appendChild(subCategory);
    foodCard.appendChild(foodName);
    foodCard.appendChild(seeRecipeBtn);

    let likeImg = document.createElement("div");
    likeImg.classList.add("like-img");

    likeImg.innerHTML = `<svg xmlns="http://w3.org" viewBox="0 0 24 24" width="100" height="100">
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="transparent" stroke="#212121" stroke-width="1" />
                    </svg>`;
    foodCard.appendChild(likeImg);

    fragment.appendChild(foodCard);
  });
  categoryContainer.appendChild(fragment);
}
displayRandomFood();
