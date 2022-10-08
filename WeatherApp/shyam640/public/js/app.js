window.onload = () =>{
   const input = document.querySelector('input');
   const submit = document.getElementById('submit');
   submit.addEventListener('click',(e) => {
      e.preventDefault();
      const address = input.value;
      const details_url = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Kxo6sEiJGIIatyAnGsv66CRZqagirm7m&q=' + address +'&language=en-in&details=true';
      fetch(details_url).then((response) => {
         e.preventDefault();
         response.json().then((data) => {
            if(data.error){
               console.log('Error!')
               console.log(data.error);
            }else if(data.length===0){
               alert('Please provide valid place!');
            }else{
               console.log(data);
               const property1 = document.getElementById('property1');
               const property2 = document.getElementById('property2');
               const property3 = document.getElementById('property3');
               const property4 = document.getElementById('property4');
               const property5 = document.getElementById('property5');
               const property6 = document.getElementById('property6');
               const property7 = document.getElementById('property7');
               const property8 = document.getElementById('property8');
               property1.innerHTML = data[0].EnglishName;
               property2.innerHTML = data[0].AdministrativeArea.LocalizedName;
               property3.innerHTML = data[0].Country.LocalizedName + '(' + data[0].Country.ID + ')';
               property4.innerHTML = data[0].Details.Population;
               property5.innerHTML = data[0].TimeZone.Code;
               property6.innerHTML = data[0].GeoPosition.Latitude;
               property7.innerHTML = data[0].GeoPosition.Longitude;
               property8.innerHTML = data[0].Type;
               const weather_url = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + data[0].Key + "?apikey=Kxo6sEiJGIIatyAnGsv66CRZqagirm7m";
               fetch(weather_url).then((response) => {
                  e.preventDefault();
                  response.json().then((data) => {
                     if(data.error){
                        document.alert(data.error);
                        console.log(data.error);
                     }
                     else if(data.length===0){
                        alert('Please provide valid place!');
                     }else{
                        const property9 = document.getElementById('property9');
                        console.log(data);
                        console.log(data.DailyForecasts[0]);
                        property9.innerHTML = 'Day-Climate : ' + data.DailyForecasts[0].Day.IconPhrase + '<br>Night-Climate : ' + data.DailyForecasts[0].Night.IconPhrase + '<br>Temperature : <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maximum = ' + data.DailyForecasts[0].Temperature.Maximum.Value + ' ' + data.DailyForecasts[0].Temperature.Maximum.Unit + '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Minimum = ' + data.DailyForecasts[0].Temperature.Minimum.Value + ' ' + data.DailyForecasts[0].Temperature.Minimum.Unit + '<br>Message : ' + data.Headline.Text;
                     }
                  });
               });
            }
         });
      });
   });
}

