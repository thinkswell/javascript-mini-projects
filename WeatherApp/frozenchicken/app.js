const api = {
    key: "15dd264653ae19e803a868ed7fb3c895",
    base: "https://api.openweathermap.org/data/2.5/"
} 

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
        searchbox.value= ''
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=15dd264653ae19e803a868ed7fb3c895`)
    .then(weather=>{
        return weather.json();
    })
    .then(displayResults);
}

function displayResults (weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name} + ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHtml = `${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`
    
    let weather_el = document.querySelector('.current .temp');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder (d) {
    let months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
}