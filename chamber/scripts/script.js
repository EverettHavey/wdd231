// scripts/directory.js

const membersURL = 'data/members.json'; // Path to your JSON data
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

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <p class="membership-level"><strong>Level:</strong> ${membershipText}</p>
            ${member.other_info ? `<p class="other-info">${member.other_info}</p>` : ''}
        `;
        memberDisplay.appendChild(card);
    });
}

// Event Listeners for view toggle buttons
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

// Initial call to load members when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getMembersData(); // This is the call that fetches the data initially
    // The displayMembers function within getMembersData will set the initial view and active button
});