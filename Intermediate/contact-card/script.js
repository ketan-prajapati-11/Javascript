// ---------- Elements ----------
const addBtn = document.getElementById('addBtn')
const upBtn = document.getElementById('upBtn')
const downBtn = document.getElementById('downBtn')

const overlay = document.getElementById('overlay')
const callForm = document.getElementById('callForm')
const closeBtn = document.getElementById('closeBtn')

const imageUrlInput = document.getElementById('imageUrl')
const fullNameInput = document.getElementById('fullName')
const homeTownInput = document.getElementById('homeTown')
const purposeInput = document.getElementById('purpose')

const contactCardEl = document.getElementById('contactCard')
const cardAvatar = document.getElementById('cardAvatar')
const cardName = document.getElementById('cardName')
const cardTown = document.getElementById('cardTown')
const cardCategory = document.getElementById('cardCategory')
const cardPurpose = document.getElementById('cardPurpose')

const colorDots = document.querySelectorAll('.dot')

// ---------- Data ----------
const STORAGE_KEY = 'callContacts'

// Used only the very first time, before anything has ever been saved
const defaultContacts = [
  { name: 'Fatima Uma', image: '', town: 'Singapore', category: 'Important', purpose: 'Confirm booking time' },
  { name: 'Rohan Mehta', image: '', town: 'Mumbai', category: 'Emergency', purpose: 'Server down, call back now' },
  { name: 'Aiko Tanaka', image: '', town: 'Tokyo', category: 'No Rush', purpose: 'Catch up sometime this week' },
  { name: 'Carlos Diaz', image: '', town: 'Madrid', category: 'Urgent', purpose: 'Contract review pending' },
  { name: 'Meera Iyer', image: '', town: 'Anand', category: 'Important', purpose: 'Confirm meeting time' },
  { name: "Liam O'Brien", image: '', town: 'Dublin', category: 'No Rush', purpose: 'Casual chat, no agenda' }
]

// contacts[0] is always treated as the "front" card that's currently shown
let contacts = []

// ---------- localStorage: save & load ----------
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    contacts = JSON.parse(saved) // turn the saved string back into a real array
  } else {
    contacts = defaultContacts   // first ever visit, nothing saved yet
    saveToStorage()
  }
}

// ---------- Render whichever contact is currently at the front ----------
function renderCard() {
  const current = contacts[0]

  cardAvatar.src = current.image
    ? current.image
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(current.name)}&background=e07a2f&color=1c1c1a`

  cardName.textContent = current.name
  cardTown.textContent = current.town
  cardCategory.textContent = current.category
  cardPurpose.textContent = current.purpose
}

// ---------- Animation helper ----------
// Removing the class then immediately re-adding it lets the animation
// replay even if the same direction is clicked twice in a row.
function replayAnimation(className) {
  contactCardEl.classList.remove('animate-up', 'animate-down')
  void contactCardEl.offsetWidth // forces the browser to "notice" the removal before we re-add
  contactCardEl.classList.add(className)
}

// ---------- Up / Down: rotate the stack circularly ----------
downBtn.addEventListener('click', function () {
  const first = contacts.shift() // take the front one off
  contacts.push(first)           // put it at the very back
  saveToStorage()
  renderCard()
  replayAnimation('animate-down')
})

upBtn.addEventListener('click', function () {
  const last = contacts.pop()    // take the last one off
  contacts.unshift(last)         // put it at the very front
  saveToStorage()
  renderCard()
  replayAnimation('animate-up')
})

// ---------- Plus icon: open the form ----------
function openForm() { overlay.classList.remove('hidden') }
function closeForm() { overlay.classList.add('hidden'); callForm.reset() }

addBtn.addEventListener('click', openForm)
closeBtn.addEventListener('click', closeForm)

// ---------- Submit: create a new contact, it becomes the front card ----------
callForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const selectedCategory = document.querySelector('input[name="category"]:checked').value

  const newContact = {
    name: fullNameInput.value,
    image: imageUrlInput.value,
    town: homeTownInput.value,
    category: selectedCategory,
    purpose: purposeInput.value
  }

  contacts.push(newContact) // goes to the very end, behind everyone already in the stack
  saveToStorage()
  closeForm()
})

// ---------- Background color swatches ----------
colorDots.forEach(dot => {
  dot.addEventListener('click', function () {
    document.body.style.background = dot.dataset.color
  })
})

// ---------- First render ----------
loadFromStorage()
renderCard()