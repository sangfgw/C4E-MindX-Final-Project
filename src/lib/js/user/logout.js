import { clearSession } from '/src/lib/js/user/sessionLogin.js'

export const logout = () => {
    // Listen Click Event
    const domLogoutBtn = document.getElementById("logout");
    domLogoutBtn && domLogoutBtn.addEventListener("click", (ev) => {
        // Clear Login Session Data
        clearSession();

        // Redirect User To Current Page If User Is Not Inside Authentication Page. Otherwise, redirect user to home page
        if (window.location.href.indexOf("user")) {

            window.location.href = "/src/pages/auth/login.html";
            return;
        }
        
        window.location.href = window.location.href;
    });
}