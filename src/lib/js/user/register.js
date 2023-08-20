import { startSessionTimer, domOnLoad, clearSession } from '/src/lib/js/user/sessionLogin.js';
import { storageFindAllUsers, storageAddUser } from '/src/lib/js/user/userStorage.js';
import { findAllUsers } from '/src/lib/js/database/db.js';

const register = () => {
    // Form Submit
    const domRegisterForm = document.getElementById("register_form");

    // DOM Validation Div
    const domAuthValidationDiv = document.getElementById("auth_validation");

    // Listen Submit Event
    domRegisterForm.addEventListener("submit", async(ev) => {
        // Prevent Form Submit
        ev.preventDefault();

        // Register State
        let registerState = true;

        // Get Form Value
        const email = document.getElementById("email").value;
        const fullname = document.getElementById("fullname").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("confirm_password").value;

        // Clear Validation Div
        domAuthValidationDiv.innerHTML = "";
        domAuthValidationDiv.classList.add("hidden");
        domAuthValidationDiv.classList.remove("flex");

        // Check Condition
        if (email === "") {
            // Display Error Into Validation Div
            domAuthValidationDiv.classList.remove("hidden");
            domAuthValidationDiv.classList.add("flex");
            domAuthValidationDiv.innerHTML += "<p>Invalid Email</p>";
        }

        if (fullname === "") {
            // Display Error Into Validation Div
            domAuthValidationDiv.classList.remove("hidden");
            domAuthValidationDiv.classList.add("flex");
            domAuthValidationDiv.innerHTML += "<p>Invalid Name</p>";
        } 

        if (password === "") {
            // Display Error Into Validation Div
            domAuthValidationDiv.classList.remove("hidden");
            domAuthValidationDiv.classList.add("flex");
            domAuthValidationDiv.innerHTML += "<p>Invalid Password</p>";
        } 

        if (password !== passwordConfirm || passwordConfirm === "") {
            // Display Error Into Validation Div
            domAuthValidationDiv.classList.remove("hidden");
            domAuthValidationDiv.classList.add("flex");
            domAuthValidationDiv.innerHTML += "<p>Invalid Confirm Password</p>";
        } 

        if (email === "" && fullname === "" && password === "" && passwordConfirm === "" && password === passwordConfirm) {
            // Set Register State
            registerState = false;

            if (!registerState) {
                // Return Function
                return;
            }
        }
        
        if (email !== "" && fullname !== "" && password !== "" && passwordConfirm !== "" && password === passwordConfirm) {
            // Generate UUID v4 - EX: "f116fb21-79f2-4ec0-8a81-85b5837ea0f3"
            let userId = crypto.randomUUID();

            // Check Data Inside Local Storage And Display Error
            const users = [];

            if (storageFindAllUsers() && Array.isArray(storageFindAllUsers()) && storageFindAllUsers().length > 0) {
                users.push(...storageFindAllUsers());

                // Validate All User Inside Local Storage
                users.every(user => {
                    // Random UUID To Make User Id Not Duplicate
                    while (user.userId === userId) {
                        userId = crypto.randomUUID();
                    }
                    
                    if (user.email === email) {
                        // Display Error Into Validation Div
                        domAuthValidationDiv.classList.remove("hidden");
                        domAuthValidationDiv.classList.add("flex");
                        domAuthValidationDiv.innerHTML += "<p>Email has already been taken.</p>";
    
                        if (user.fullname === fullname) {
                            // Display Error Into Validation Div
                            domAuthValidationDiv.classList.remove("hidden");
                            domAuthValidationDiv.classList.add("flex");
                            domAuthValidationDiv.innerHTML += "<p>Name has already been taken.</p>";
                        }
                        // Set Register State
                        registerState = false;

                        return false;
                    } 

                    if (user.fullname === fullname) {
                        // Display Error Into Validation Div
                        domAuthValidationDiv.classList.remove("hidden");
                        domAuthValidationDiv.classList.add("flex");
                        domAuthValidationDiv.innerHTML += "<p>Name has already been taken.</p>";

                        // Set Register State
                        registerState = false;

                        return false;
                    }
    
                    return true;
                });

                if (!registerState) {
                    // Return Function
                    return;
                }
            }
            

            // Check Seeding User Duplicate
            const seedUsers = await findAllUsers();
            if (seedUsers && Array.isArray(seedUsers) && seedUsers.length > 0) {
                // Validate All User Inside Seeding JSON Data
                seedUsers.every(user => {
                    // Random UUID To Make User Id Not Duplicate
                    while (user.userId === userId) {
                        userId = crypto.randomUUID();
                    }
                    
                    if (user.email === email) {
                        // Display Error Into Validation Div
                        domAuthValidationDiv.classList.remove("hidden");
                        domAuthValidationDiv.classList.add("flex");
                        domAuthValidationDiv.innerHTML += "<p>Email has already been taken.</p>";
    
                        if (user.fullname === fullname) {
                            // Display Error Into Validation Div
                            domAuthValidationDiv.classList.remove("hidden");
                            domAuthValidationDiv.classList.add("flex");
                            domAuthValidationDiv.innerHTML += "<p>Name has already been taken.</p>";
                        }
                        // Set Register State
                        registerState = false;

                        return false;
                    } 

                    if (user.fullname === fullname) {
                        // Display Error Into Validation Div
                        domAuthValidationDiv.classList.remove("hidden");
                        domAuthValidationDiv.classList.add("flex");
                        domAuthValidationDiv.innerHTML += "<p>Name has already been taken.</p>";

                        // Set Register State
                        registerState = false;

                        return false;
                    }
    
                    return true;
                });

                
                if (!registerState) {
                    // Return Function
                    return;
                }
            }


            // Add Data Into Local Storage
            storageAddUser(userId, email, password, fullname);

            // Clear Session If Have
            clearSession();

            // Add Data Into Session
            sessionStorage.setItem("loggedIn", "true"); // Store Session Login State
            sessionStorage.setItem('sessionStart', new Date().getTime()); // Store the session start time
            sessionStorage.setItem('userInfo', JSON.stringify({id: userId, fname: fullname, loginDate: Date.now()}));

            // Redirect User To Home Page With Login State
            window.location.href = "/src/pages/index.html";
        }
    });
}

// Using Register Function
register();

// Check session state
if (sessionStorage.getItem("loggedIn") === "true") {
    console.log(sessionStorage.getItem("loggedIn"));
    // User is logged in, perform authorized actions
    if (document.referrer !== '') {
        window.location.href = document.referrer;
    } else {
        window.location.href = "/src/pages/index.html";
    }
    
}