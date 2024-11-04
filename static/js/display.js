  // Function to get query parameters from URL
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        subject_name: params.get('subject_name'),
        group: params.get('group'),
        level: params.get('level')
    };
}

// Display the subject details
function displaySubjectDetails() {
    const subjectDetails = getQueryParams();
    const detailsContainer = document.getElementById('subject-details');
    
    detailsContainer.innerHTML = `
        <h1>Subject Details</h1>
        <p><strong>Subject Name:</strong> ${subjectDetails.subject_name}</p>
        <p><strong>Group:</strong> ${subjectDetails.group}</p>
        <p><strong>Level:</strong> ${subjectDetails.level}</p>
    `;
}

// Run display function when the page loads
displaySubjectDetails();