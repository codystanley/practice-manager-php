/* ------------------------ */
/* Practice Dropdown Loader */
/* ------------------------ */
fetch('get_practices.php')

.then(practiceResponse => practiceResponse.json())

.then(practices => {
    const practiceDropdown = document.getElementById('practiceDropdown');

    // Populate dropdown with practices
    practices.forEach(practice => {
        const option = document.createElement('option');
        option.value = practice.prac_id;
        option.text = practice.prac_long_name;
        practiceDropdown.add(option);
    });
});

/* ------------------------- */
/* Office Information Loader */
/* ------------------------- */
document.getElementById('practiceDropdown').addEventListener('change', function() {
    
    const selectedPracticeId = this.value;
    
    fetch('get_practices.php')
    
    .then(practiceResponse => practiceResponse.json())
    
    .then(practices => {
        const selectedPractice = practices.find(practice => practice.prac_id === selectedPracticeId);
        document.getElementById('practiceName').textContent = selectedPractice.prac_name;
        document.getElementById('practiceAddress').textContent = selectedPractice.prac_address;
        document.getElementById('officePhone').textContent = "Office: " + selectedPractice.office_phone;
        document.getElementById('backlinePhone').textContent = "Backline: " + selectedPractice.backline_phone;
        document.getElementById('fax').textContent = "Fax: " + selectedPractice.fax_phone;
    });
});

/* --------------------------- */
/* Contacts Information Loader */
/* --------------------------- */
document.getElementById('practiceDropdown').addEventListener('change', function() {
    
    const selectedPracticeId = this.value;
    
    fetch('get_contacts.php')
    
    .then(contactResponse => contactResponse.json())
    
    .then(contacts => {
        contacts.foreach(contact => {
        const selectedPractice = contacts.find(contact => contact.con_prac === selectedPracticeId);
        document.getElementById('contactName').textContent = selectedPractice._con_full_name;
        document.getElementById('contactType').textContent = selectedPractice.con_type;
        document.getElementById('contactCellPhone').textContent = selectedPractice.con_cell;
        document.getElementById('contactOtherPhone').textContent = selectedPractice.con_other;
        document.getElementById('contactEmail').textContent = selectedPractice.con_email;
    })
    });
});