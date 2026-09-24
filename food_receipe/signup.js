// ===================== Sign Up: Local "Database" =====================

const USERS_KEY = 'recipeApp_users';

// Get all registered users (array of objects) from localStorage
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
        return [];
    }
}

// Save the full users array back to localStorage
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Check if an email is already registered
function isEmailTaken(email) {
    const users = getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// ===================== Sign Up Form Handling =====================

const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const photoUrl = document.getElementById('photoUrl').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('Please fill in all required fields.');
        return;
    }

    if (isEmailTaken(email)) {
        alert('An account with this email already exists. Please login instead.');
        window.location.href = 'login.html';
        return;
    }

    const newUser = {
        username: username,
        email: email,
        photoUrl: photoUrl || '',
        password: password, // plain text — prototype only, see earlier note
        createdAt: new Date().toISOString()
    };

    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    alert('Account created successfully! Redirecting to login...');

    // Redirect to login page after successful signup
    window.location.href = 'login.html';
});

// ===================== "Click here" -> Login redirect =====================
// Handles the "Have an account? click here to Login" link
const loginLink = document.querySelector('.newUser a');
if (loginLink) {
    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'login.html';
    });
}
