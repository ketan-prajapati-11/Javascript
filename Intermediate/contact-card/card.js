
let addBtn = document.querySelector(".add-btn");
let upBtn = document.querySelector(".up-btn");
let downBtn = document.querySelector(".down-btn");

let overlay = document.querySelector(".overlay");
let callForm = document.querySelector(".call-form"); // FIXED: was ".call-from"
let closeBtn = document.querySelector(".close-btn");

let imageUrlInput = document.getElementById("img-url");
let fullNameInput = document.getElementById("full-name");
let homeTownInput = document.getElementById("home-town");
let purposeInput = document.getElementById("purpose");

let contactCardEl = document.querySelector(".contact-card");
let cardAvatar = document.querySelector(".avatari");
let cardName = document.querySelector(".name");
let cardTown = document.getElementById("homeData"); // FIXED: was "#homedata" (wrong case)
let cardCategory = document.getElementById("catergoryData");
let cardPurpose = document.querySelector(".purpose");

let colorDots = document.querySelectorAll(".color-btn"); // FIXED: missing "." + wrong variable name + needed querySelectorAll

//
const Storage_Data = "callContacts";
// const defaultContacts =[]
const defaultContacts = [
  {
    name: "Fatima Uma",
    image: "",
    town: "Singapore",
    category: "Important",
    purpose: "Confirm booking time",
  },
  {
    name: "Rohan Mehta",
    image: "",
    town: "Mumbai",
    category: "Emergency",
    purpose: "Server down, call back now",
  },
  {
    name: "Aiko Tanaka",
    image: "",
    town: "Tokyo",
    category: "No Rush",
    purpose: "Catch up sometime this week",
  },
  {
    name: "Carlos Diaz",
    image: "",
    town: "Madrid",
    category: "Urgent",
    purpose: "Contract review pending",
  },
  {
    name: "Meera Iyer",
    image: "",
    town: "Anand",
    category: "Important",
    purpose: "Confirm meeting time",
  },
  {
    name: "Liam O'Brien",
    image: "",
    town: "Dublin",
    category: "No Rush",
    purpose: "Casual chat, no agenda",
  },
];

let contacts = [];

function saveToStorage() {
  localStorage.setItem(Storage_Data, JSON.stringify(contacts));
}

function loadFromStorage() {
  const savedData = localStorage.getItem(Storage_Data);
  if (savedData) {
    contacts = JSON.parse(savedData); // FIXED: was JSON.parse(saved)
  } else {
    contacts = defaultContacts;
    saveToStorage();
  }
}

function renderCard() {
  let current = contacts[0];

  cardAvatar.src = current.image
    ? current.image
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(current.name)}&background=342e2e&color=ffffff`;
  cardName.textContent = current.name;
  cardTown.textContent = current.town;
  cardCategory.textContent = current.category;
  cardPurpose.textContent = current.purpose;
}

function replayAnimation(className) {
  contactCardEl.classList.remove("animate-down", "animate-up");
  void contactCardEl.offsetWidth; // forces the browser to "notice" the removal before we re-add
  contactCardEl.classList.add(className);
}

downBtn.addEventListener("click", function () {
  const first = contacts.shift();
  contacts.push(first);
  saveToStorage();
  renderCard();
  replayAnimation("animate-down");
});

upBtn.addEventListener("click", function () {
  const last = contacts.pop();
  contacts.unshift(last);
  saveToStorage();
  renderCard();
  replayAnimation("animate-up");
});

//---form data in
function openForm() {
  overlay.classList.remove("hidden");
}

function closeForm() {
  overlay.classList.add("hidden");
  callForm.reset();
}


addBtn.addEventListener("click", openForm);
closeBtn.addEventListener("click", closeForm);

callForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedCategory = document.querySelector(
    'input[name="category"]:checked',
  ).value;

  const newContact = {
    name: fullNameInput.value,
    image: imageUrlInput.value,
    town: homeTownInput.value,
    category: selectedCategory,
    purpose: purposeInput.value,
  };
  contacts.push(newContact);
  saveToStorage();
  closeForm();
});

colorDots.forEach((dot) => {
  dot.addEventListener("click", function () {
    document.body.style.backgroundColor = dot.dataset.color;
  });
});

loadFromStorage();
renderCard();