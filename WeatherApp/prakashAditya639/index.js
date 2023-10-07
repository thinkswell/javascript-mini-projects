const getWeatherButton = document.getElementById('getWeatherButton');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
getWeatherButton.addEventListener('click', () => { 
    const city = cityInput.value;
    const apiKey = '15dd264653ae19e803a868ed7fb3c895';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementsByTagName('h1')[0].textContent = `Weather of ${city}`;
            cityName.textContent = data.name;
            temperature.textContent = data.main.temp;
            weatherDescription.textContent = data.weather[0].description;
        })
        .catch(error => {
            document.getElementsByTagName('h1')[0].textContent = `Invalid City`;
            console.log(error);
        });
});
