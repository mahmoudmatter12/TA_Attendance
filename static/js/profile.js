function checkLogin() {
    if (!sessionStorage.getItem('currentUser')) {
        window.location.href = '/templates/login.html';
    }
}


// Redirect to login if the user is not logged in
function checkLogin() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '/templates/login.html';
        return;
    }

    // Display user info if logged in
    displayProfileInfo(JSON.parse(currentUser));
}

// Display the user's profile information
function displayProfileInfo(user) {
    const profileInfoDiv = document.getElementById('profileInfo');
    profileInfoDiv.innerHTML = `
        <p>Username: ${user.name}</p>
        <p>Role: ${user.role}</p>
        <p>ID: ${user.id}</p>
    `;
}

// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = '/templates/login.html';
}
function time_table() {
    window.location.href = '/templates/time_table.html';
}

// Run the login check when the page loads
checkLogin();
