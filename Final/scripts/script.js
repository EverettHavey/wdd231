function validateForm() {
  let location = document.getElementById("location").value;
  if (location == "") {
    alert("Please enter a location.");
    return false;
  }
  return true;
}



fetch('scripts/profile.json')
  .then(response => response.json())
  .then(data => {
    const trainerGrid = document.querySelector('.featured-trainers');
    data.trainers.forEach(trainer => {
      const trainerCard = document.createElement('div');
      trainerCard.className = 'trainer-card';
      trainerCard.innerHTML = `
        <img src="${trainer.image_url}" alt="${trainer.name} profile photo">
        <h4>${trainer.name}</h4>
        <p>${trainer.specialty}</p>
        <a href="#">View Profile</a>
      `;
      trainerGrid.appendChild(trainerCard);
    });
  })
  .catch(error => console.error('Error fetching data:', error));