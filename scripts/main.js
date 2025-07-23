document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const courseItems = document.querySelectorAll('.course-item');
    
    const courseCountDisplay = document.getElementById('courseCount');

    const updateCourseCount = () => {
        let count = 0;
        
        courseItems.forEach(item => {
            if (item.style.display === 'block') { 
                count++;
            }
        });
        
        courseCountDisplay.textContent = count;
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');

            const filterCategory = button.dataset.filter; 

            
            courseItems.forEach(item => {
                const itemCategory = item.dataset.category;

                
                if (filterCategory === 'all' || itemCategory === filterCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            updateCourseCount();
        });
    });

    const allButton = document.querySelector('.filter-button[data-filter="all"]');
    if (allButton) {
        allButton.click();
    } else {

        updateCourseCount();
    }
});

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

courseDiv.addEventListener('click', () => {
  displayCourseDetails(course);
});