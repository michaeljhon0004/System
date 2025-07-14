const planets = [
    {
        name: "Earth",
        orbitalPeriod: 365.25,
        color: "#00d4ff",
        fact: "The only known planet to support life",
        animation: "assets/planets/earth.mp4"
    },
    {
        name: "Mercury",
        orbitalPeriod: 88,
        color: "#cccccc",
        fact: "Closest planet to the Sun",
        animation: "assets/planets/mercury.mp4"
    },
    {
        name: "Venus",
        orbitalPeriod: 224.7,
        color: "#ffcc70",
        fact: "Brightest object in our night sky after the Moon",
        animation: "assets/planets/venus.mp4"
    },
    {
        name: "Mars",
        orbitalPeriod: 687,
        color: "#ff6b6b",
        fact: "Once had liquid water on its surface",
        animation: "assets/planets/mars.mp4"
    },
    {
        name: "Jupiter",
        orbitalPeriod: 4333,
        color: "#f0e68c",
        fact: "Has a giant storm bigger than Earth",
        animation: "assets/planets/jupiter.mp4"
    },
    {
        name: "Saturn",
        orbitalPeriod: 10759,
        color: "#ffd966",
        fact: "Its rings are made of ice and rock",
        animation: "assets/planets/saturn.mp4"
    },
    {
        name: "Uranus",
        orbitalPeriod: 30687,
        color: "#a8edea",
        fact: "Spins almost completely sideways",
        animation: "assets/planets/uranus.mp4"
    },
    {
        name: "Neptune",
        orbitalPeriod: 60190,
        color: "#6c63ff",
        fact: "Blue due to methane in its atmosphere",
        animation: "assets/planets/neptune.mp4"
    },
    {
        name: "Pluto",
        orbitalPeriod: 90560,
        color: "#c2bcbc",
        fact: "Still beloved as the ninth planet by many",
        animation: "assets/planets/pluto.mp4"
    }
];

function initPlanets() {
    const grid = document.getElementById('planets-grid');
    grid.innerHTML = '';

    planets.forEach(planet => {
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.innerHTML = `
            <div class="planet-video-container">
                <video autoplay loop muted playsinline>
                    <source src="${planet.animation}" type="video/mp4">
                </video>
            </div>
            <h3 class="planet-name">${planet.name}</h3>
            <p class="planet-age-text">Your age: <span class="planet-age">0</span> years</p>
            <p class="planet-fact galaxy-fact">${planet.fact}</p>
        `;
        grid.appendChild(card);
    });
}

function calculateAges() {
    const earthAge = parseFloat(document.getElementById('age-input').value);

    if (isNaN(earthAge)) {
        showNotification('Please enter a valid number!', 'error');
        return;
    }

    if (earthAge <= 0 || earthAge > 120) {
        showNotification('Age must be between 1-120 years', 'error');
        return;
    }

    planets.forEach(planet => {
        const planetAge = (earthAge * planets[0].orbitalPeriod / planet.orbitalPeriod).toFixed(2);
        updatePlanetAge(planet.name, planetAge, planet.color);
    });

    showNotification('Age calculated across the solar system!', 'success');
}

function updatePlanetAge(name, age, color) {
    const cards = document.querySelectorAll('.planet-card');
    cards.forEach(card => {
        const nameElement = card.querySelector('.planet-name');
        if (nameElement && nameElement.textContent === name) {
            const ageElement = card.querySelector('.planet-age');
            if (ageElement) {
                ageElement.textContent = age;
                ageElement.style.color = color;
                ageElement.style.transition = "color 0.5s ease";
                ageElement.animate([
                    { transform: "scale(1.1)" },
                    { transform: "scale(1)" }
                ], {
                    duration: 300,
                    easing: "ease-out"
                });
            }
        }
    });
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    initPlanets();

    document.getElementById('calculate-btn').addEventListener('click', calculateAges);

    document.getElementById('age-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateAges();
        }
    });
});
