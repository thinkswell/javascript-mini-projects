var key =config.API_KEY + '' ;
console.log(typeof key)
const loader = document.getElementById('loader');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}
const options =
{
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

//making fetch request

const getdata = async (city) => {
    //getting name of city from input field

    cityName.innerHTML = city.slice(0,1).toUpperCase()+ city.slice(1,cityName.length) ;
    showLoader();
    await fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then(response => {

            // changing content of page based on response object
            temp.innerHTML = response.temp,
                wind_speed.innerHTML = response.wind_speed,
                humidity.innerHTML = response.humidity,
                min_temp.innerHTML = response.min_temp,
                max_temp.innerHTML = response.max_temp,

                hideLoader();
        })
        .catch(() => {
            hideLoader();
            err => console.log(err + "an error has ocuured");
        });
}

// wheather of specific city

fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=delhi', options)
    .then(response => response.json())
    .then(response => {
        delhi_temp.innerHTML = response.temp,
            delhi_wind_speed.innerHTML = response.wind_speed,
            delhi_humidity.innerHTML = response.humidity
    })
    .catch(err => console.log(err + "an error has ocuured"));



fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=london', options)
    .then(response => response.json())
    .then(response => {

        london_temp.innerHTML = response.temp,
            london_wind_speed.innerHTML = response.wind_speed,
            london_humidity.innerHTML = response.humidity
    })
    .catch(err => console.log(err + "an error has ocuured"));

fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=new york', options)
    .then(response => response.json())
    .then(response => {

        newyork_temp.innerHTML = response.temp,
            newyork_wind_speed.innerHTML = response.wind_speed,
            newyork_humidity.innerHTML = response.humidity
    })
    .catch(err => console.log(err + "an error has ocuured"));

fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=tokyo', options)
    .then(response => response.json())
    .then(response => {
        tokyo_temp.innerHTML = response.temp,
            tokyo_wind_speed.innerHTML = response.wind_speed,
            tokyo_humidity.innerHTML = response.humidity
    })
    .catch(err => console.log(err + "an error has ocuured"));


document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    getdata(document.getElementById("city").value)

})

getdata("delhi");