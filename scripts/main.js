document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const courseItems = document.querySelectorAll('.course-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const filterCategory = button.dataset.filter; // Get the filter from data-filter attribute

            courseItems.forEach(item => {
                const itemCategory = item.dataset.category; // Get the category from data-category attribute

                // If the filter is 'all' OR the item's category matches the filter category, show the item
                if (filterCategory === 'all' || itemCategory === filterCategory) {
                    item.style.display = 'block'; // Show the item
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });
        });
    });

    // Optional: Trigger the 'All' filter on page load to ensure all courses are visible initially.
    // This makes sure the page loads with all courses displayed by default.
    const allButton = document.querySelector('.filter-button[data-filter="all"]');
    if (allButton) {
        allButton.click(); // Simulate a click on the 'All' button
    }
});