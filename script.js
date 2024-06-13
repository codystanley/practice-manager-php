// Fetch practice data when the page loads
fetch('get_practices.php')

.then(practiceResponse => practiceResponse.json())

.then(practices => {
    const practiceDropdown = document.getElementById('practiceDropdown');

    // Populate dropdown with practices
    practices.forEach(practice => {
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
    
    .then(practiceResponse => practiceResponse.json())
    
    .then(practices => {
        const selectedPractice = practices.find(practice => practice.practice_id === selectedPracticeId);
        document.getElementById('practiceAddress').textContent = selectedPractice.practice_address;
        document.getElementById('officePhone').textContent = "Office: " + selectedPractice.phone_office;
        document.getElementById('backlinePhone').textContent = "Backline: " + selectedPractice.phone_backline;
        document.getElementById('fax').textContent = "Fax: " + selectedPractice.fax_office;
    });
});

// Display contact details when a practice is selected
document.getElementById('practiceDropdown').addEventListener('change', function() {
    
    const selectedPracticeId = this.value;
    
    fetch('get_contacts.php')
    
    .then(contactResponse => contactResponse.json())
    
    .then(contacts => {
        const selectedPractice = contacts.find(contact => contact.practice === selectedPracticeId);
        document.getElementById('contactName').textContent = selectedPractice.first_name;
    });
});