// Temporary storage for attendance data and headers
let attendanceData = [];
let headers = [];

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const ssn = document.getElementById('ssn').value;
    searchStudent(ssn);
});

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        level: params.get('level'),
        group: params.get('group')
    };
}

async function searchStudent(ssn) {
    // Hide the "already attended" message each time a new search is attempted
    document.getElementById('alreadyAttendedMessage').style.display = 'none';

    // Check if SSN already exists in attendanceData
    const alreadyExists = attendanceData.some(row => row[0] === ssn);
    if (alreadyExists) {
        // Show the warning message if the student has already attended
        document.getElementById('alreadyAttendedMessage').style.display = 'block';
        return;
    }

    try {
        // Fetch the CSV file
        const response = await fetch('/Data/students.csv');
        const csvData = await response.text();

        // Parse CSV data
        const students = csvData.split('\n').map(line => line.split(','));

        // Extract headers from the first row
        if (attendanceData.length === 0 && students.length > 0) {
            headers = students[0];
        }

        const studentData = students.find(row => row[0] === ssn); // Assuming SSN is in the first column

        const resultDiv = document.getElementById('studentInfo');
        resultDiv.innerHTML = '';

        if (studentData) {
            // Get level and group from URL
            const { level, group } = getURLParams();
            const studentLevel = studentData[headers.indexOf('level')]; // Assuming "level" column exists in headers
            const studentGroup = studentData[headers.indexOf('group')]; // Assuming "group" column exists in headers

            if (studentLevel === level && studentGroup === group) {
                // If levels and groups match, add to attendanceData
                addStudentToAttendance(studentData);
            } else {
                // Show student info and prompt professor to confirm addition
                resultDiv.innerHTML = `<h2>Student Information</h2>`;
                headers.forEach((header, index) => {
                    resultDiv.innerHTML += `<p><strong>${header}:</strong> ${studentData[index]}</p>`;
                });

                const confirmMessage = document.createElement('div');
                confirmMessage.innerHTML = `
                    <p>Level and group do not match. Do you want to add this student to the attendance anyway?</p>
                    <button id="confirmAddBtn">Add</button>
                    <button onclick="clearStudentInfo()">Cancel</button>
                `;
                resultDiv.appendChild(confirmMessage);

                // Add event listener for the "Add" button
                document.getElementById('confirmAddBtn').addEventListener('click', function() {
                    addStudentToAttendance(studentData);
                });
            }
        } else {
            resultDiv.innerHTML = '<p>No student found with that SSN.</p>';
        }
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
    }
}

function addStudentToAttendance(studentData) {
    // Append the data to attendanceData for later download
    attendanceData.push(studentData);

    // Update attendance count display
    updateAttendanceCount();

    // Clear the student info section
    clearStudentInfo();
}

function clearStudentInfo() {
    document.getElementById('studentInfo').innerHTML = '';
}

function updateAttendanceCount() {
    // Display the current number of students in attendanceData
    document.getElementById('attendanceCount').textContent = attendanceData.length;
}

function downloadAndClear() {
    if (attendanceData.length === 0) {
        alert('No data to download');
        return;
    }

    // Create workbook and add attendance data with headers
    const wb = XLSX.utils.book_new();
    const worksheetData = [headers].concat(attendanceData); // Add headers as the first row
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

    // Generate XLSX and trigger download
    XLSX.writeFile(wb, 'attendance.xlsx');

    // Clear attendance data for new entries
    attendanceData = [];
    updateAttendanceCount(); // Reset the counter display
    alert('Data downloaded and cleared');
}

function Clear() {
    document.getElementById('ssn').value = '';
    document.getElementById('studentInfo').innerHTML = '';
    document.getElementById('attendanceCount').innerHTML = 0;
    document.getElementById('alreadyAttendedMessage').style.display = 'none';
    attendanceData = [];
}