// Fetch practice data when the page loads
fetch('get_practices.php') // Replace with the correct path to your PHP file

.then(response => response.json())

.then(practices => {
    const practiceDropdown = document.getElementById('practiceDropdown');

    practices.forEach(practice => { // Populate dropdown with practices
        const option = document.createElement('option');
        option.value = practice.practice_id; // Assuming each practice has an ID
        option.text = practice.practice_full_name; // Assuming each practice has a Name field
        practiceDropdown.add(option);
    });
});

// Display practice details when a practice is selected
document.getElementById('practiceDropdown').addEventListener('change', function() {
    const selectedPracticeId = this.value;
    
    fetch('get_practices.php')
    
    .then(response => response.json())
    
    .then(practices => {
        const selectedPractice = practices.find(practice => practice.practice_id === selectedPracticeId);
        document.getElementById('practiceGroup').textContent = selectedPractice.practice_group;
        document.getElementById('practiceName').textContent = selectedPractice.practice_name;
        document.getElementById('practiceAddress').textContent = selectedPractice.practice_address;
        document.getElementById('officePhone').textContent = selectedPractice.phone_office;
        document.getElementById('backlinePhone').textContent = selectedPractice.phone_backline;
        document.getElementById('fax').textContent = selectedPractice.fax_office;
    });
});