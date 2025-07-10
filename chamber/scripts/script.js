// scripts/script.js

// --- Hamburger Menu Logic ---
const hamBtn = document.getElementById('ham-btn');
const navBar = document.getElementById('nav-bar');

hamBtn.addEventListener('click', () => {
    navBar.classList.toggle('show');
    hamBtn.classList.toggle('show');
});

// --- Date Display Logic ---
// Get the current year
const currentYear = new Date().getFullYear();
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = currentYear;
}

// Get the last modification date of the document
const lastModified = document.lastModified;
const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = lastModified;
}

// --- Directory Members Logic ---
const membersURL = 'scripts/members.json'; // *** Adjusted path to members.json ***
const memberDisplay = document.getElementById('member-display');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

let allMembersData = []; // To store the fetched data globally

// Function to fetch member data
async function getMembersData() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allMembersData = await response.json(); // Store the fetched data
        displayMembers(allMembersData, 'grid'); // Display initially in grid view
    } catch (error) {
        console.error("Could not fetch members:", error);
        memberDisplay.innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
}

// Function to display members
function displayMembers(members, viewType) {
    memberDisplay.innerHTML = ''; // Clear existing content
    memberDisplay.className = ''; // Clear existing view classes
    memberDisplay.classList.add(viewType === 'grid' ? 'member-grid' : 'member-list');

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        // Membership Level Mapping
        let membershipText = '';
        switch (member.membership_level) {
            case 1:
                membershipText = 'Basic Member';
                break;
            case 2:
                membershipText = 'Silver Membership';
                break;
            case 3:
                membershipText = 'Gold Membership';
                break;
            default:
                membershipText = 'Unknown Level';
        }

        // Check if image path is defined before creating img tag
        const imageHtml = member.image ? `<img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">` : '';

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
            ${imageHtml}
            <p class="membership-level"><strong>Level:</strong> ${membershipText}</p>
            ${member.other_info ? `<p class="other-info">${member.other_info}</p>` : ''}
        `;
        memberDisplay.appendChild(card);
    });
}

// Event Listeners for view toggle buttons
// Check if buttons exist before adding listeners (important if this script is used on other pages)
if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
        displayMembers(allMembersData, 'grid'); // Use the cached data
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        displayMembers(allMembersData, 'list'); // Use the cached data
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}


// Initial calls when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only attempt to fetch members if the display element exists (i.e., on directory.html)
    if (memberDisplay) {
        getMembersData();
        // Set initial active state for grid button only if buttons exist
        if (gridViewBtn) {
             gridViewBtn.classList.add('active');
        }
    }
});