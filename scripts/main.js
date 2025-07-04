document.addEventListener('DOMContentLoaded', () => {
    // Select all filter buttons and all course items
    const filterButtons = document.querySelectorAll('.filter-button');
    const courseItems = document.querySelectorAll('.course-item');

    // Add event listeners to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons to reset visual state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the currently clicked button
            button.classList.add('active');

            // Get the filter category from the clicked button's data-filter attribute
            const filterCategory = button.dataset.filter;

            // Iterate over each course item to show/hide based on the filter
            courseItems.forEach(item => {
                // Get the course item's category from its data-category attribute
                const itemCategory = item.dataset.category;

                // Logic to show or hide the course item
                // If the filter is 'all' OR the item's category matches the selected filter, show it
                if (filterCategory === 'all' || itemCategory === filterCategory) {
                    item.style.display = 'block'; // Make the item visible
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });
        });
    });

    // This block ensures that all courses are displayed when the page first loads.
    // It simulates a click on the 'All' button.
    const allButton = document.querySelector('.filter-button[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
});