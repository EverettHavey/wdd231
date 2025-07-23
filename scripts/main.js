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

const courses = [
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        description: "An introductory course to web development, covering HTML, CSS, and basic JavaScript.",
        certificate: "Web Foundations",
        technology: ["HTML5", "CSS3", "JavaScript"]
    },
    {
        subject: "WDD",
        number: 131,
        title: "Programming with JavaScript",
        credits: 2,
        description: "This course focuses on advanced JavaScript concepts, DOM manipulation, and event handling.",
        certificate: "Web Development",
        technology: ["JavaScript", "DOM", "APIs"]
    },
    {
        subject: "WDD",
        number: 231,
        title: "Front-End Web Development",
        credits: 2,
        description: "Build interactive and responsive user interfaces using modern front-end frameworks and tools.",
        certificate: "Front-End Developer",
        technology: ["React", "Vue", "Angular", "Responsive Design"]
    },
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        description: "Learn the fundamentals of programming using a high-level language.",
        certificate: "Programming Basics",
        technology: ["Python", "Algorithms", "Data Structures"]
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        description: "Delve deeper into programming concepts, focusing on functions, modules, and error handling.",
        certificate: "Advanced Programming",
        technology: ["Python", "Functions", "Modules"]
    }
];

const courseDetailsModal = document.getElementById('course-details');

function displayCourseDetails(course) {
    if (!courseDetailsModal) {
        console.error("Course details modal element not found!");
        return;
    }

    courseDetailsModal.innerHTML = '';

    courseDetailsModal.innerHTML = `
        <button id="closeModal" aria-label="Close modal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;

    courseDetailsModal.showModal();

    const closeModalButton = document.getElementById('closeModal');
    if (closeModalButton) {
        closeModalButton.addEventListener("click", () => {
            courseDetailsModal.close();
        });
    }

    courseDetailsModal.addEventListener('click', (event) => {
        if (event.target === courseDetailsModal) {
            courseDetailsModal.close();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const courseListContainer = document.querySelector('.course-list');
    const courseCountSpan = document.getElementById('courseCount');
    const filterButtons = document.querySelectorAll('.filter-button');

    function renderCourses(filteredCourses) {
        if (!courseListContainer) return;

        courseListContainer.innerHTML = '';

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course-item');
            courseDiv.setAttribute('data-category', course.subject.toLowerCase());
            courseDiv.textContent = `${course.subject} ${course.number}`;

            courseDiv.addEventListener('click', () => {
                displayCourseDetails(course);
            });

            courseListContainer.appendChild(courseDiv);
        });

        if (courseCountSpan) {
            courseCountSpan.textContent = filteredCourses.length;
        }
    }

    renderCourses(courses);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            let filteredCourses = [];

            if (filter === 'all') {
                filteredCourses = courses;
            } else {
                filteredCourses = courses.filter(course => course.subject.toLowerCase() === filter);
            }
            renderCourses(filteredCourses);
        });
    });
});