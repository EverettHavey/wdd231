document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.getElementById('submission-timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            const modalId = this.getAttribute('href');
            const targetModal = document.querySelector(modalId);
            if (targetModal) {
                targetModal.style.display = 'flex';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
            const params = new URLSearchParams(window.location.search);
            const dataDisplay = document.getElementById('submitted-data');
            
            dataDisplay.innerHTML = ''; 

            const fieldsToDisplay = {
                'fname': 'First Name',
                'lname': 'Last Name',
                'email': 'Email',
                'phone': 'Phone Number',
                'bizname': 'Business Name',
                'submission_timestamp': 'Submission Date/Time'
            };

            for (const [paramName, displayName] of Object.entries(fieldsToDisplay)) {
                if (params.has(paramName)) {
                    let value = params.get(paramName);
                    if (paramName === 'submission_timestamp') {
                        const date = new Date(value);
                        value = date.toLocaleString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric',
                            hour: '2-digit', minute: '2-digit', second: '2-digit'
                        });
                    }
                    dataDisplay.innerHTML += `<p><strong>${displayName}:</strong> ${decodeURIComponent(value)}</p>`;
                }
            }

            if (dataDisplay.innerHTML === '') {
                dataDisplay.innerHTML = '<p>No data submitted or data could not be retrieved.</p>';
            }
        });