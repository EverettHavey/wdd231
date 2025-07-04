document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const courseItems = document.querySelectorAll('.course-item');
    // Get the element where the course count will be displayed
    const courseCountDisplay = document.getElementById('courseCount');

    // Function to update the displayed course count
    const updateCourseCount = () => {
        let count = 0;
        // Iterate through all course items and count only those that are currently visible
        courseItems.forEach(item => {
            if (item.style.display === 'block') { // Check if the item is currently displayed
                count++;
            }
        });
        // Update the text content of the span with the calculated count
        courseCountDisplay.textContent = count;
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset active state for all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Set the clicked button as active
            button.classList.add('active');

            const filterCategory = button.dataset.filter; // Get the filter category (all, cse, wdd)

            // Loop through all course items to show/hide them
            courseItems.forEach(item => {
                const itemCategory = item.dataset.category; // Get the item's category (cse, wdd)

                // Show if filter is 'all' or if item's category matches the selected filter
                if (filterCategory === 'all' || itemCategory === filterCategory) {
                    item.style.display = 'block'; // Make the item visible
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });

            // After filtering is complete, update the course count
            updateCourseCount();
        });
    });

    // Initial call: Trigger the 'All' filter on page load to ensure all courses are visible
    // and the correct initial count is displayed.
    const allButton = document.querySelector('.filter-button[data-filter="all"]');
    if (allButton) {
        allButton.click(); // This will run the click logic, including updateCourseCount()
    } else {
        // Fallback: If 'All' button somehow isn't found, ensure count is still initialized
        updateCourseCount();
    }
});