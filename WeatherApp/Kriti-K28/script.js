$(document).ready(function () {
    $("#searchInput").on("keyup",function(e) {
       // console.log(e.target.value);
       var cityName=e.target.value;
       const API_KEY="882364a5ad40071c4c0fe9c3a6ea5efe";

           //make a request to open weather server
          $.ajax({
            
             url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
          //we have to return data that we take from the server so will use done function with parameter
         }).done(function(weatherdata){
          console.log(weatherdata);

          //we have to display data in profile div .for this we will access data from url json data 
          $("#profile").html(`
         
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">Weather: ${weatherdata.weather[0].description}</h5>
                  <p class="card-text">Temperature: ${weatherdata.main.temp} &#8451 <br> It feel like ${weatherdata.main.feels_like}&#8451</p>
                  <a href="https://www.google.com/search?q=${cityName}" class="btn btn-primary">Know more about this place</a>
                </div>
              </div>

          `)
         });     
    }) 
})

