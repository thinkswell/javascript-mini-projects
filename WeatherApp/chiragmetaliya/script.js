const apiKey = '11b99e1fc528f63c99423edeae4f422c';

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const body = document.body;

    if (data.cod === 200) {
        const { temp } = data.main;
        const { description, icon } = data.weather[0];
        const { humidity } = data.main;
        const { speed } = data.wind;

        let background = 'background.jpg'; // Default background
        if (description.includes('rain')) {
            background = 'rainy.jpg';
        } else if (description.includes('cloud')) {
            background = 'cloudy.jpg';
        } else if (description.includes('sun')) {
            background = 'sunny.jpg';
        }

        body.style.backgroundImage = `url('images/${background}')`;

        weatherInfo.innerHTML = `
            <div class="weather-item"><strong>Temperature:</strong> ${temp} °C</div>
            <div class="weather-item">
                <strong>Condition:</strong> ${description}
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
            </div>
            <div class="weather-item"><strong>Humidity:</strong> ${humidity}%</div>
            <div class="weather-item"><strong>Wind Speed:</strong> ${speed} m/s</div>
        `;

        weatherInfo.classList.add('show');
    } else {
        weatherInfo.innerHTML = `<div class="weather-item">City not found</div>`;
        weatherInfo.classList.remove('show');
    }
}
