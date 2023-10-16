const apiKey="41bef1d1ddc74b3a74a8bc031d21e70d";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weathericon=document.querySelector(".weather-icon");

async function checkWeather(city){
    const response=await fetch(apiUrl+city+`&appid=${apiKey}`);

    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data=await response.json();

    // console.log(data);

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+" km/h ";

    if(data.weather[0].main=="Clouds"){
        weathericon.src="images/images/clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        weathericon.src="images/images/clear.png"
    }
    else if(data.weather[0].main=="Rain"){
        weathericon.src="images/images/rain.png"
    }
    else if(data.weather[0].main=="Drizzle"){
        weathericon.src="images/images/drizzle.png"
    }
    
    else if(data.weather[0].main=="Mist"){
        weathericon.src="images/images/mist.png"
    }

    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";
}
    }

    

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})
