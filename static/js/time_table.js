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

// Fetch timetable data for the logged-in user for the current day based on `id`
function fetchTimetableByUserId(userId) {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const todayName = daysOfWeek[today];

    fetch(`/Data/time_table/${todayName}.json`)
        .then(response => response.json())
        .then(data => {
            const profTimetable = data.find(entry => entry.prof_id === userId.toString());

            if (profTimetable) {
                displayTimetable(profTimetable.subjects);
            } else {
                displayTimetable(['No timetable found for this professor.']);
            }
        })
        .catch(error => console.error('Error fetching timetable:', error));
}
function displayTimetable(subjects) {
    const timetableContainer = document.getElementById('timetable');
    timetableContainer.innerHTML = '';

    if (subjects.length === 0 || typeof subjects === 'string') {
        // Display message if no subjects are found
        const messageElement = document.createElement('div');
        messageElement.textContent = subjects;
        timetableContainer.appendChild(messageElement);
        return;
    }

    subjects.forEach((subject, index) => {
        const subjectElement = document.createElement('div');
        subjectElement.className = 'subject-entry';

        // Subject information with button
        subjectElement.innerHTML = `
            <strong>${index + 1}. ${subject.subject_name}</strong><br>
            Group: ${subject.group} | Level: ${subject.level}<br>
            <button class="btn btn-info" onclick="redirectToSubject('${subject.subject_name} ', '${subject.group}', '${subject.level}')">View Details</button>
            <hr>
        `;

        timetableContainer.appendChild(subjectElement);
    });
}

// Function to redirect to display.html with subject data in URL
function redirectToSubject(name, group, level) {
    // Encode parameters to make them URL-safe
    const url = `/templates/display.html?subject_name=${encodeURIComponent(name)}&group=${encodeURIComponent(group)}&level=${encodeURIComponent(level)}`;
    window.location.href = url;
}


// Fetch and display timetable for the logged-in user based on `id`
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (currentUser && currentUser.id) {
    fetchTimetableByUserId(currentUser.id);
}

// Run the login check when the page loads
checkLogin();
