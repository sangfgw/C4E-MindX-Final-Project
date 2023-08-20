// Timer for session
var timer;

// Define Session Timeout duration in minutes
var sessionTimeOut = 5 * 60 * 1000; // 5 minutes (5 * 60 * 1000)

// Function to handle clear login session
export const clearSession = () => {
    // Clear Previous Session Timer If Have
    clearInterval(timer);

    // Clear Session Data
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("sessionStart");
    sessionStorage.removeItem("userInfo");
}

// Function to handle session expiration
export const sessionExpired = () => {
    // Clear Previous Session Timer If Have
    clearInterval(timer);

    // Clear Session Data
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("sessionStart");
    sessionStorage.removeItem("userInfo");

    // Alert To User
    alert("Session expired. Please log in again.");


    // Redirect or perform other actions
    window.location.href = '/src/pages/auth/login.html';
}

// Function to extend the session
const extendSession = () => {
    startSessionTimer();
    alert("Session Extended!");
}

// Function to check login session
export const checkLoginSession = () => {
    // Initialize isLogin Boolean Variable
    let isLoggedin = false;

    // Get Login Start Time
    let sessionStart = sessionStorage.getItem("sessionStart");

    if (!sessionStart) {
        // No session found, redirect to login page
        // window.location.href = '/src/pages/auth/login.html';
        return isLoggedin;
    }

    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - sessionStart;

    if (elapsedTime >= sessionTimeOut) {
        // Session expired, redirect to login page
        sessionExpired();
        return isLoggedin;
    }

    // isLogged in True When Session Remain
    isLoggedin = true;
    return isLoggedin;
}

// Function to start or reset the session expiration timer
export const startSessionTimer = () => {
    let sessionStart = sessionStorage.getItem("sessionStart");
    
    if (!sessionStart) {
        // No session found, redirect to login page
        // window.location.href = '/src/pages/auth/login.html';
        return;
    }

    // Clear Previous Session Timer If Have
    clearInterval(timer);

    // Set Timer To Expired Session
    // setTimeout(sessionExpired, sessionTimeOut); // 5 minutes = 5 * 60 * 1000ms
    timer = setInterval(checkLoginSession, 1000) // Check the session every second
}

// Check session on page load
export const domOnLoad = () => {
    document.addEventListener('DOMContentLoaded', checkLoginSession)
};

// Check session state
export const checkSessionState = () => {
    if (sessionStorage.getItem("loggedIn") && sessionStorage.getItem("loggedIn") === "true") {
        // Redirect To Home Page When User LoggedIn
        window.location.href = "/src/pages/index.html";
    }
}

// Get User Info From Session
export const findUserInfo = () => {
    if (sessionStorage.getItem("userInfo") && sessionStorage.getItem("loggedIn") === "true") {
        return JSON.parse(sessionStorage.getItem("userInfo"));
    }
    return;
}