//  ====================== steps or process ===========================

// 1.get location cordinates:: if user input city convert it coordinate and if user use current location we directly get cordinate 
// 2.when we got coordinate , get weather details form this coordinates..
// weather ditails is given 3hr gap 5 days 
// 3. filter these weather and get one forcast per day.
//4. creates weather cards using these filterd data.
// 5.  

// =======================================================================

// =======   navbar ==================================================
const menuIcon = document.querySelector(".humberg-menu i")
const menuContent = document.querySelector(".menu-content")

menuIcon.addEventListener("click", () => {
    menuContent.classList.toggle("open")
    menuIcon.classList.toggle("uil-times")
})
// =======================================================================
// ================= swpaer js ============================
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    // loop: true,
    centeredSlides: true,
    fade: 'true',
    spaceBetween: 30,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        }
    },
});



// selection all variables ==================================================
const API_KEY = "28c2b467e5bc6dee079a32184988da3c"

const searchBtn = document.querySelector(".city-submit")
const input = document.querySelector(".input-city")
const inputLocation = document.querySelector(".input-location")

const currentWeatherCard = document.querySelector(".current-weather-card");
const weaklyWeatherCards = document.getElementById("weakly-weather-container")
const hourlyCards = document.getElementById("hourly-section");
const swiperSlidCard = document.querySelector(".swiper-slide");



// function for createing current weather card ..............................
const createCurrentweatherCard = (dailyforecast, city) => {
    //handle background according to weather desc./////////////
    const cloudStatus = dailyforecast.weather[0].description;
    if (cloudStatus == "light rain") {
        currentWeatherCard.style.backgroundImage = "url('assets/light rain.gif')";
    } else if (cloudStatus == "moderate rain") {
        currentWeatherCard.style.backgroundImage = "url('assets/rain.webp')";
    } else if (cloudStatus == "scattered clouds" || cloudStatus == "broken clouds" || cloudStatus == "overcast clouds") {
        currentWeatherCard.style.backgroundImage = "url('assets/scrated sky.gif')";
    } else if (cloudStatus == "clear sky") {
        currentWeatherCard.style.backgroundImage = "url('assets/clear sky.gif')";
    }

    return `<div class="cityinfo"> 
    <h1 class="city-name">${city}</h1>
    <h3 class="city-time">${dailyforecast.dt_txt.split(" ")[0]}</h3>
 </div>
 <div class="city-temp">
  <img class="current-weather-img" src="https://openweathermap.org/img/wn/${dailyforecast.weather[0].icon}.png" alt="">
   <h1 class="temp-value">${(dailyforecast.main.temp - 273.15).toFixed(2)} °C</h1>
 </div>
 <div class="desc"> <p> ${dailyforecast.weather[0].description} </p> </div>
 <div class="other-details">
  <div class="firstline-details">
    <div class="humidity">
      <h1>${dailyforecast.main.humidity} %</h1>
      <p>humidity</p>
    </div>
    <div class="windspeed">
      <h1>${dailyforecast.wind.speed} km/h</h1>
      <p>Wind speed</p>
    </div>
  </div>
  <div class="lastline-details">
    <div class="feellikes">
      <h1>${(dailyforecast.main.feels_like - 273.15).toFixed(2)} °C</h1>
      <p>Feels like</p>
    </div>
    <div class="pressure">
      <h1>${dailyforecast.main.pressure}</h1>
      <p>pressure</p>
    </div>
  </div>
 </div>`;

}

//function for creating weakly weather cards ...................................
const createWeaklyweatherCard = (dailyforecast) => {
    //for dayname and date extract only ///////
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const d = new Date(dailyforecast.dt_txt.split(" ")[0])
    const dayName = d.toString().split(' ')[0];

    return `<div class="weakly-weather-card swiper-slide">
     <div class="weakly-card-time">
      <h2 class="weakly-card-date">${dayName}</h2>
     </div>
     <div class="weakly-card-temp">
      <img src="https://openweathermap.org/img/wn/${dailyforecast.weather[0].icon}.png" class="weakly-card-img" alt="">
      <h2 class="weakly-temp">${(dailyforecast.main.temp - 273.15).toFixed(2)} °C</h2>
     </div>
      <p class="weakly-card-desc">${dailyforecast.weather[0].description}</p>
     <div class="weakly-card-others">
      <div class="weakly-card-left">
        <h2 class="weakly-card-humidity">${dailyforecast.main.humidity} %</h2>
        <p>Humidity</p>
        <h2 class="weakly-card-wind">${dailyforecast.wind.speed} km/h</h2>
        <p>Wind speed</p>
      </div>
      <div class="weakly-card-left">
        <h2 class="weakly-card-feels">${(dailyforecast.main.feels_like - 273.15).toFixed(2)} °C</h2>
        <p>Feels like</p>
        <h2 class="weakly-card-pressure">${dailyforecast.main.pressure}</h2>
        <p>Pressure</p>
      </div>
     </div>
  </div>`;

    //   <h2 class="weakly-card-bar">SUN</h2>
}
// function for get current time (09:00) of the day ..........
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure 2-digit format
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure 2-digit format
    const currentTime = `${hours}:${minutes}`;
    return currentTime;
}

// creating hourly weather forecast cards.....................////////////

const createHourlyForecastcards = (hourforecast, index) => {
    const currentTime = getCurrentTime();
    // console.log(currentTime)
    let curtime = hourforecast.dt_txt.split(" ")[1].slice(0, 5)
    let cc = currentTime.substring(0, 2);
    let n = Number(cc);
    console.log(curtime, n, cc)

    // let c = 0;
    // if (n) {
    //   c++;
    //   return `
    //    <h2 class=" update-msg"> Weather forcast update at 00:00,that will show 3hr gap weather for the day.</h2>
    //   `;
    // }

    return ` <div class="swiper-slide hourly-card" >
   <h3 class="current-time">${curtime}</h3>
 <img class="hourly-img" src="https://openweathermap.org/img/wn/${hourforecast.weather[0].icon}.png" class="hourly-card-img" alt="">
  <h2 class="hourly-temp">${(hourforecast.main.temp - 273.15).toFixed(2)} °C</h2>
  <p class="hourly-desc">${hourforecast.weather[0].description}</p>
  <div class="hourly-humidity">
    <p>Humidity: </p>
    <h2>${hourforecast.main.humidity} %</h2>
  </div>
  <div class="hourly-windspeed">
   <p>Wind Speed: </p>
   <h2>${hourforecast.wind.speed} km/h</h2>
  </div>
 </div>`;
}
//fucntion for get weather details form coordinates.............

const getWeatherDetails = (name, lat, lon) => {
    const weatherurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    fetch(weatherurl).then(res => res.json()).then(data => {
        // console.log(data);
        // weakly and current forest////////////////////////////
        const weaklyforecast = [];
        //filtering 7 days forcats one forcast per day.
        const filteredforecast = data.list.filter(forecast => {
            const forday = new Date(forecast.dt_txt).getDate();
            if (!weaklyforecast.includes(forday)) {
                return weaklyforecast.push(forday);
            }
        });

        currentWeatherCard.innerHTML = " "
        weaklyWeatherCards.innerHTML = " "
        //  console.log(filteredforecast)
        const city = name;
        filteredforecast.forEach((dailyforecast, index, city) => {
            if (index == 0) {
                currentWeatherCard.innerHTML = createCurrentweatherCard(dailyforecast, name)
            } else {
                weaklyWeatherCards.innerHTML += createWeaklyweatherCard(dailyforecast)
            }
        })

        // weather forecast for hourly.//////////////////////////..........
        // console.log(data);
        const todaysforecast = [];
        const todaysfilteredforecast = data.list.filter(forecast => {
            const today = new Date(forecast.dt_txt).getDate();
            //  console.log(today)
            const curday = new Date().getDate()
            if (curday == today) {
                return todaysforecast.push(forecast);
            }
        })
        // console.log(todaysforecast);
        hourlyCards.innerHTML = ""
        if (hourlyCards.length == 0) {
            hourlyCards.innerHTML = "Hourly Forecast are update at 00:00, that will show 3hr gap weather forcast for current day."
        }

        todaysfilteredforecast.forEach((hourforecast, index) => {
            hourlyCards.innerHTML += createHourlyForecastcards(hourforecast, index)
        })


    }).catch(() => {
        alert("An error occurs while Weather details ")
    })

}
// function for get coordinate for input city name......................

const getCityCoordinate = () => {
    const cityName = input.value
    // console.log(cityName)
    // if(!cityName) return;
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=28c2b467e5bc6dee079a32184988da3c`

    fetch(geoUrl).then(res => res.json()).then(data => {
        const { name, lat, lon } = data[0];

        getWeatherDetails(name, lat, lon)

    }).catch(() => {
        alert("An error occurs while featching the coordinates!")
    })

}
// function for get user coordinates when user click use my current location  ............................
const getuserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            // console.log(position.coords)
            const { latitude, longitude } = position.coords
            const ReverseGeocoding = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            fetch(ReverseGeocoding).then(res => res.json()).then(data => {
                // console.log(data[0].name);
                const usercityName = data[0].name
                getWeatherDetails(usercityName, latitude, longitude);
            })
        },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("please reset location permisition ..")
            }
            console.log(error)
        }
    );
}


//when user inpur a city and click search btn..
searchBtn.addEventListener("click", getCityCoordinate);

//when user click use current location..
inputLocation.addEventListener("click", getuserCoordinates);
window.addEventListener("load", getuserCoordinates);
