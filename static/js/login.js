document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/Data/users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.name === username && user.pass === password);

                if (user) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = '/';
                } else {
                    alert('Invalid username or password');
                }
            });
    });

    function parseCSV(data) {
        const lines = data.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }
});



const currentUser = sessionStorage.getItem('currentUser');
const loginLink = document.getElementById('loginLink');

if (currentUser) {
    loginLink.textContent = 'Logout';
    loginLink.href = '/logout';
} else {
    loginLink.textContent = 'Login';
    loginLink.href = '/login';
}