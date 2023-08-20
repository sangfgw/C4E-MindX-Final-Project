import { findAllUsers } from '/src/lib/js/database/db.js';
import { checkSessionState } from '/src/lib/js/user/sessionLogin.js';
import { storageFindAllUsers } from '/src/lib/js/user/userStorage.js';

const domAuthValidationDiv = document.getElementById("auth_validation");
const loginUser = {};
// Function: Check Login Email and Password Valid Or Not
const isValidAccount = async(email = String, password = String) => {
    const users = await findAllUsers();
    const storageUsers = storageFindAllUsers();
    let isValid = false;

    if (users && Array.isArray(users) && users.length > 0) {
        users.every(user => {
            if (user.email === email && user.password === password)
            {
                isValid = true;
                Object.assign(loginUser, user);
                return false;
            }

            return true;
        });
    }

    if (storageUsers && Array.isArray(storageUsers) && storageUsers.length > 0) {
        storageUsers.every(user => {
            if (user.email === email && user.password === password)
            {
                isValid = true;
                Object.assign(loginUser, user);
                return false;
            }

            return true;
        });
    }

    return isValid;
}

// Function: Return Error Message When User Login Failed
const login = async() => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (await isValidAccount(email, password)) {
        // console.log("Valid");
        sessionStorage.setItem("loggedIn", "true"); // Store Session Login State
        sessionStorage.setItem('sessionStart', new Date().getTime()); // Store the session start time
        sessionStorage.setItem('userInfo', JSON.stringify({id: loginUser.userId, fname: loginUser.fullname, loginDate: Date.now()}));
        // Check session state
        if (sessionStorage.getItem("loggedIn") === "true") {
            // User is logged in, perform authorized actions
            if (document.referrer !== '') {
                window.location.href = document.referrer;
            } else {
                window.location.href = "/src/pages/index.html";
            }
        }
    } else {
        // alert("Invalid username or password");
        const domAuthValidationDiv = document.getElementById("auth_validation");
        // Display Error Into Validation Div
        domAuthValidationDiv.classList.remove("hidden");
        domAuthValidationDiv.classList.add("flex");
        domAuthValidationDiv.innerText = "Invalid username or password";
    }
}

// Submit Form Event
const domLoginForm = document.getElementById("login_form");
domLoginForm.addEventListener("submit", (ev) => {
    // Prevent Submit Form
    ev.preventDefault();

    // Handle Login
    login();
});

// Check Session State
checkSessionState();
