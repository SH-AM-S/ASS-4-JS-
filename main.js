const existingUsers = [
    { email: 'user1@example.com', password: 'Password1!' },
    { email: 'user2@example.com', password: 'Password2@' }
];

document.getElementById('login-button').addEventListener('click', validateLogin);
document.getElementById('show-signup-link').addEventListener('click', showSignUpForm);
document.getElementById('signup-button').addEventListener('click', signUp);
document.getElementById('show-login-link').addEventListener('click', showLoginForm);

function validateLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMessage = document.getElementById('login-error');
    const successMessage = document.getElementById('login-success');

    if (!email || !password) {
        errorMessage.textContent = 'Please enter both email and password.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    const user = existingUsers.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        errorMessage.textContent = 'Email not found. Please sign up first.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    if (password !== user.password) {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    errorMessage.style.display = 'none';
    successMessage.textContent = 'Login successful!';
    successMessage.style.display = 'block';
}

function showSignUpForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function signUp() {
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const errorMessage = document.getElementById('signup-error');
    const successMessage = document.getElementById('signup-success');

    if (!username || !email || !password) {
        errorMessage.textContent = 'Please enter username, email, and password.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    if (!validatePassword(password)) {
        errorMessage.textContent = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    if (existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        errorMessage.textContent = 'Email already exists. Please log in.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    existingUsers.push({ email: email.toLowerCase(), password });
    errorMessage.style.display = 'none';
    successMessage.textContent = 'Sign up successful! You can now log in.';
    successMessage.style.display = 'block';
    setTimeout(showLoginForm, 2000);
}

function validatePassword(password) {
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*]/;

    if (password.length < minLength ||
        !uppercasePattern.test(password) ||
        !lowercasePattern.test(password) ||
        !digitPattern.test(password) ||
        !specialCharPattern.test(password)) {
        return false;
    }
    return true;
}


