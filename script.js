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
        document.getElementById('officePhone').innerHTML = "<strong>Office:</strong> " + selectedPractice.office_phone;
        document.getElementById('backlinePhone').innerHTML = "<strong>Backline:</strong> " + selectedPractice.backline_phone;
        document.getElementById('fax').innerHTML = "<strong>Fax:</strong> " + selectedPractice.fax_phone;
    });
});

/* ------------------- */
/* Office Hours Loader */
/* ------------------- */
document.getElementById('practiceDropdown').addEventListener('change', function() {
    const selectedPracticeId = this.value;
    const hoursContainer = document.getElementById("officeHours");

    fetch('get_office_hours.php')
        .then(hoursResponse => {
            if (!hoursResponse.ok) { // Check if the response is successful
                throw new Error('Network response was not ok.');
            }
            return hoursResponse.json();
        })
        .then(hours => {
            // Ensure hours is an array before using find
            if (Array.isArray(hours)) {
                const selectedPractice = hours.find(hours => hours.hours_prac == selectedPracticeId); // Convert to number for comparison
                if (selectedPractice) {
                    document.getElementById('timezone').innerHTML = "<strong>Timezone: </strong>" + selectedPractice.timezone;
                    document.getElementById('monday').innerHTML = 
                        "<strong>Monday: </strong>" + selectedPractice.mon_has_hours + " " + selectedPractice.mon_open + " - " + selectedPractice.mon_close;
                    document.getElementById('tuesday').innerHTML = 
                        "<strong>Tuesday: </strong>" + selectedPractice.tue_has_hours + " " + selectedPractice.tue_open + " - " + selectedPractice.tue_close;
                    document.getElementById('wednesday').innerHTML = 
                        "<strong>Wednesday: </strong>" + selectedPractice.wed_has_hours + " " + selectedPractice.wed_open + " - " + selectedPractice.wed_close;
                    document.getElementById('thursday').innerHTML = 
                        "<strong>Thursday: </strong>" + selectedPractice.thu_has_hours + " " + selectedPractice.thu_open + " - " + selectedPractice.thu_close;
                    document.getElementById('friday').innerHTML = 
                        "<strong>Friday: </strong>" + selectedPractice.fri_has_hours + " " + selectedPractice.fri_open + " - " + selectedPractice.fri_close;
                    document.getElementById('saturday').innerHTML = 
                        "<strong>Saturday: </strong>" + selectedPractice.sat_has_hours + " " + selectedPractice.sat_open + " - " + selectedPractice.sat_close;
                    document.getElementById('sunday').innerHTML = 
                        "<strong>Sunday: </strong>" + selectedPractice.sat_has_hours + " " + selectedPractice.sat_open + " - " + selectedPractice.sat_close;
                    document.getElementById('schedStart').innerHTML = "<strong>On Call Starts/Ends: </strong>" + selectedPractice.oc_sched_start_end;
                    document.getElementById('default').innerHTML = "<strong>Default On-Call Provider: </strong>" + selectedPractice.oc_default;
                    document.getElementById('ocNotes').innerHTML = "<strong>Scheduling Notes: </strong>" + selectedPractice.oc_sched_notes;   
                } else {
                    document.getElementById('monday').innerHTML = "Office hours not found for this practice.";
                }
            } else {
                // Handle case where the response is not an array
                document.getElementById('monday').innerHTML = "Invalid data format received.";
            }
        })
        .catch(error => {
            // Handle fetch errors or JSON parsing errors
            console.error("Error fetching or parsing hours:", error);
            document.getElementById('monday').innerHTML = "Error fetching office hours."; 
        });
});



/* --------------------------- */
/* Contacts Information Loader */
/* --------------------------- */
document.getElementById('practiceDropdown').addEventListener('change', function() {
    
    const selectedPracticeId = this.value;

    const contactContainer = document.getElementById("contactInfo");
    
    fetch('get_contacts.php')
    
    .then(contactResponse => contactResponse.json())
    
    .then(contacts => {
        const contactsByType = {};
        contacts.forEach(contact => {
        const type = contact.con_type;
        if (!contactsByType[type]) {
            contactsByType[type] = [];
        }
        contactsByType[type].push(contact);
    });

    for (const type in contactsByType) {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");

        // Create card header with the type as the title
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.textContent = type;
        card.appendChild(cardHeader);

        // Create a list within the card body
        const listGroup = document.createElement("ul");
        listGroup.classList.add("list-group", "list-group-flush");

        // Add contacts of this type to the list
        contactsByType[type].forEach(contact => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");

            // Display contact information within the list item
            const nameElement = document.createElement("strong");
            nameElement.textContent = contact._con_full_name;

            const detailsElement = document.createElement("p");
            detailsElement.classList.add("mb-0"); // Remove bottom margin from the paragraph
            detailsElement.textContent = `Cell: ${contact.con_cell}`;

            listItem.appendChild(nameElement);
            listItem.appendChild(detailsElement);
            listGroup.appendChild(listItem);
        });

        // Append the list to the card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.appendChild(listGroup);
        card.appendChild(cardBody);

        // Append the card to the container
        contactContainer.appendChild(card);
        }
    });
});