// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = '/templates/login.html';
}
function home() {
    window.location.href = '/';
}
function scanner() {
    window.location.href = '/templates/scanner.html';
}
function checkLogin() {
    if (!sessionStorage.getItem('currentUser')) {
        window.location.href = '/templates/login.html';
    }
}
// Display user profile information
function displayProfileInfo(user) {
    const profileContainer = document.getElementById('profile');
    profileContainer.innerHTML = ''; // Clear previous profile info

    const nameElement = document.createElement('div');
    nameElement.className = 'profile-name';
    nameElement.innerHTML = `<strong>Name:</strong> ${user.name}`;
    profileContainer.appendChild(nameElement);

    const roleElement = document.createElement('div');
    roleElement.className = 'profile-role';
    roleElement.innerHTML = `<strong>Role:</strong> ${user.role}`;
    profileContainer.appendChild(roleElement);

    const idElement = document.createElement('div');
    idElement.className = 'profile-id';
    idElement.innerHTML = `<strong>ID:</strong> ${user.id}`;
    profileContainer.appendChild(idElement);

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', logout);
    profileContainer.appendChild(logoutButton);

    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
    homeButton.addEventListener('click', home);
    profileContainer.appendChild(homeButton);

    const dayElement = document.createElement('div');
    dayElement.className = 'profile-day';
    dayElement.innerHTML = `<strong>Today is:</strong> ${todayName}`;
    profileContainer.appendChild(dayElement);

}

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const today = new Date().getDay();
const todayName = daysOfWeek[today];




// const currentUser = sessionStorage.getItem('currentUser');
// const loginLink = document.getElementById('loginLink');

// if (currentUser) {
//     loginLink.textContent = 'Logout';
//     loginLink.addEventListener('click', logout);
// } else {
//     loginLink.textContent = 'Login';
//     loginLink.href = '/templates/login.html';
// }