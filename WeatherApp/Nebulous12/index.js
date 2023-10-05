let weather = {
    apiKey:"c282e0a10686033499532b9b50aae98e",
    fetchWeather : function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
         "&appid="+ this.apiKey+"&units=metric").then((response)=> response.json()).then((data)=> this.displayWeather(data));

    },
    
displayWeather : function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0]; 
    const { temp, humidity} = data.main;
    const { speed } = data.wind;
    
    document.querySelector(".city").innerText = 'Weather in ' + name;
    //document.querySelector(".icon").src = "https://openweatherapp.org/img/wn/"+icon +"@2x.png"
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp+'°C';
    document.querySelector('.humidity').innerText = 'Humidity:'+humidity+"%";
    document.querySelector('.wind').innerText = 'Wind speed:'+speed+"km/h";
    document.querySelector(".weather").classList.remove('loading')
}, search : function(){
    this.fetchWeather(document.querySelector(".search-bar").value)
}
};
document.querySelector(".search button").addEventListener("click",function(){
     weather.search();
})

document.querySelector('search-bar').addEventListener("keydown", function(e){

    if (e.key == 'Enter'){
           weather.search();
    }

});


weather.fetchWeather("Denver");




