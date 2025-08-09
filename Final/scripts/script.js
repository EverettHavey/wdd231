function validateForm() {
  let location = document.getElementById("location").value;
  if (location == "") {
    alert("Please enter a location.");
    return false;
  }
  return true;
}



function showProfile(trainerId) {
    const modal = document.getElementById('profileModal');
    const trainerBio = document.getElementById('trainerBio');

    fetch('scripts/profile.json')
        .then(response => response.json())
        .then(data => {
            const trainer = data.trainers.find(t => t.id === trainerId);
            if (trainer) {
                trainerBio.innerHTML = `
                    <img src="${trainer.image_url}" alt="${trainer.name} profile photo" class="profile-image">
                    <h3>${trainer.name}</h3>
                    <p><strong>Specialty:</strong> ${trainer.specialty}</p>
                    <p><strong>Experience:</strong> ${trainer.experience_years} years</p>
                    <p><strong>Bio:</strong> ${trainer.bio}</p>
                    <p><strong>Location:</strong> ${trainer.location}</p>
                    <p><strong>Rates:</strong> $${trainer.rates.per_session} per session</p>
                    <a href="#" class="cta-button">Contact ${trainer.name}</a>
                `;
                modal.style.display = "block";
            } else {
                trainerBio.innerHTML = '<h3>Trainer not found.</h3>';
                modal.style.display = "block";
            }
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
            trainerBio.innerHTML = '<h3>Error loading profile.</h3>';
            modal.style.display = "block";
        });
}

function closeModal() {
    const modal = document.getElementById('profileModal');
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}