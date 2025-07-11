const hamBtn = document.getElementById('ham-btn');
const navBar = document.getElementById('nav-bar');

hamBtn.addEventListener('click', () => {
    navBar.classList.toggle('show');
    hamBtn.classList.toggle('show');
});

const currentYear = new Date().getFullYear();
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = currentYear;
}

const lastModified = document.lastModified;
const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = lastModified;
}

const membersURL = 'scripts/members.json';
const memberDisplay = document.getElementById('member-display');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

let allMembersData = [];

async function getMembersData() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allMembersData = await response.json();
        displayMembers(allMembersData, 'grid');
    } catch (error) {
        console.error("Could not fetch members:", error);
        memberDisplay.innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
}

function displayMembers(members, viewType) {
    memberDisplay.innerHTML = '';
    memberDisplay.className = '';
    memberDisplay.classList.add(viewType === 'grid' ? 'member-grid' : 'member-list');

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

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

if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
        displayMembers(allMembersData, 'grid');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        displayMembers(allMembersData, 'list');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (memberDisplay) {
        getMembersData();
        if (gridViewBtn) {
             gridViewBtn.classList.add('active');
        }
    }
});