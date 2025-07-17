const hamBtn = document.getElementById('ham-btn');
const navBar = document.getElementById('nav-bar');

if (hamBtn && navBar) {
    hamBtn.addEventListener('click', () => {
        navBar.classList.toggle('show');
        hamBtn.classList.toggle('show');
        const isExpanded = navBar.classList.contains('show');
        hamBtn.setAttribute('aria-expanded', isExpanded);
    });
    hamBtn.setAttribute('aria-expanded', 'false');
}

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

const weatherApiKey = 'ae210c2f1df036d2a70a689e0174b825';
const city = 'Minato City';
const countryCode = 'JP';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;

async function getWeatherData() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error(`HTTP error! Current: ${weatherResponse.status}, Forecast: ${forecastResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayWeather(weatherData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        const weatherDisplay = document.getElementById('weather-display');
        if (weatherDisplay) {
            weatherDisplay.innerHTML = '<p>Failed to load weather data. Please try again later.</p>';
        }
    }
}

function displayWeather(data) {
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-desc');

    if (currentTemp && weatherDesc) {
        currentTemp.textContent = data.main.temp.toFixed(1);
        weatherDesc.textContent = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}

function displayForecast(data) {
    const forecastDaysContainer = document.getElementById('forecast-days');
    if (!forecastDaysContainer) return;

    forecastDaysContainer.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        date.setHours(0, 0, 0, 0);

        if (date.getTime() > today.getTime()) {
            const dateString = date.toISOString().split('T')[0];
            if (!dailyForecasts[dateString]) {
                dailyForecasts[dateString] = {
                    minTemp: item.main.temp,
                    maxTemp: item.main.temp,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                };
            } else {
                dailyForecasts[dateString].minTemp = Math.min(dailyForecasts[dateString].minTemp, item.main.temp);
                dailyForecasts[dateString].maxTemp = Math.max(dailyForecasts[dateString].maxTemp, item.main.temp);
            }
        }
    });

    const forecastDates = Object.keys(dailyForecasts).sort();
    const threeDayForecast = forecastDates.slice(0, 3);

    threeDayForecast.forEach(dateString => {
        const forecast = dailyForecasts[dateString];
        const dayName = new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });

        const forecastDayDiv = document.createElement('div');
        forecastDayDiv.classList.add('forecast-day');
        forecastDayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${forecast.minTemp.toFixed(0)}&deg;C / ${forecast.maxTemp.toFixed(0)}&deg;C</p>
            <p>${forecast.description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.description}">
        `;
        forecastDaysContainer.appendChild(forecastDayDiv);
    });
}

document.addEventListener('DOMContentLoaded', getWeatherData);

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
        if (memberDisplay) {
            displayMembers(allMembersData, 'grid');
        }
    } catch (error) {
        console.error("Could not fetch members:", error);
        if (memberDisplay) { 
            memberDisplay.innerHTML = '<p>Error loading member data. Please try again later.</p>';
        }
    }
}

function displayMembers(members, viewType) {
    if (!memberDisplay) {
        return; 
    }

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

        const imageHtml = (member.image) ? 
            `<img src="${member.image}" alt="${member.name} Logo" loading="lazy">` : '';
        
        card.innerHTML = `
            ${imageHtml} 
            <div>
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                <p class="membership-level"><strong>Level:</strong> ${membershipText}</p>
                ${member.other_info ? `<p class="other-info">${member.other_info}</p>` : ''}
            </div>
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

async function displaySpotlights() {
    const spotlightsContainer = document.getElementById('spotlights-container');
    if (!spotlightsContainer) return;

    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        const eligibleMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);

        spotlightsContainer.innerHTML = '';

        if (eligibleMembers.length === 0) {
            spotlightsContainer.innerHTML = '<p>No spotlight members available at this time.</p>';
            return;
        }

        const selectedSpotlights = [];
        const numSpotlights = Math.min(eligibleMembers.length, Math.floor(Math.random() * 2) + 2);

        while (selectedSpotlights.length < numSpotlights) {
            const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
            const selectedMember = eligibleMembers[randomIndex];
            if (!selectedSpotlights.includes(selectedMember)) {
                selectedSpotlights.push(selectedMember);
            }
        }

        selectedSpotlights.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('spotlight-card');

            let membershipText = '';
            switch (member.membership_level) {
                case 2:
                    membershipText = 'Silver Membership';
                    break;
                case 3:
                    membershipText = 'Gold Membership';
                    break;
                default:
                    membershipText = 'N/A';
            }

            card.innerHTML = `
                ${member.image ? `<img src="${member.image}" alt="${member.name} Logo" loading="lazy">` : ''}
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                <p><strong>Level:</strong> ${membershipText}</p>
                ${member.other_info ? `<p>${member.other_info}</p>` : ''}
            `;
            spotlightsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching member spotlights:", error);
        if (spotlightsContainer) {
            spotlightsContainer.innerHTML = '<p>Error loading member spotlights. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('weather-display')) {
        getWeatherData();
    }
    if (document.getElementById('spotlights-container')) {
        displaySpotlights();
    }

    if (memberDisplay) {
        getMembersData();
        if (gridViewBtn) {
            gridViewBtn.classList.add('active');
        }
    }
});