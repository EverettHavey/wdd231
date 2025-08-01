document.addEventListener('DOMContentLoaded', () => {

    const visitorMessage = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysAgo = Math.floor((now - lastVisit) / oneDayInMilliseconds);
        if (daysAgo < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysAgo === 1 ? 'day' : 'days';
            visitorMessage.textContent = `You last visited ${daysAgo} ${dayText} ago.`;
        }
    }

    localStorage.setItem('lastVisit', now);

    const discoverGrid = document.getElementById('discover-grid');

    const createCard = (attraction) => {
        const card = document.createElement('div');
        card.className = 'discover-card';

        const h2 = document.createElement('h2');
        h2.textContent = attraction.name;

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = attraction.image;
        img.alt = attraction.name;
        img.loading = 'lazy';
        figure.appendChild(img);

        const address = document.createElement('address');
        address.textContent = attraction.address;

        const description = document.createElement('p');
        description.textContent = attraction.description;

        const button = document.createElement('button');
        button.className = 'learn-more';
        button.textContent = "learn more";

        card.appendChild(h2);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        return card;
    };

    const fetchAttractions = async () => {
        try {
            const response = await fetch('data/discover-data.json');
            const data = await response.json();
            data.attractions.forEach(attraction => {
                const card = createCard(attraction);
                discoverGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching the attraction data:', error);
            discoverGrid.textContent = 'Could not load attractions at this time.';
        }
    };

    fetchAttractions();
});