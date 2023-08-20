// Function: Return Array User Object
export const storageFindAllUsers = () => {
    // Get User Data From Local Storage And Return
    return JSON.parse(localStorage.getItem("users"));
}

// Function: Add User Data Into Local Storage
export const storageAddUser = (userId = String, email= String, password = String, fullname = String) => {
    console.log(userId, email, password, fullname);
    // Get Date Format
    const dateNow = new Date().toISOString();

    // Add User Into Local Storage
    if (storageFindAllUsers() && Array.isArray(storageFindAllUsers()) && storageFindAllUsers().length > 0) {
        localStorage.setItem("users", JSON.stringify([...storageFindAllUsers(), {userId: userId, email: email, password: password, fullname: fullname, createdAt: dateNow, updatedAt: dateNow}]));
        return;
    }

    localStorage.setItem("users", JSON.stringify([{userId: userId, email: email, password: password, fullname: fullname, createdAt: dateNow, updatedAt: dateNow}]));
}