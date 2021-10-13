const request = require('request');

// searching with name (making api call)
const url = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Kxo6sEiJGIIatyAnGsv66CRZqagirm7m&q=Gwalior&language=en-in&details=true';
request({url: url},(error, response) => {
   const data = JSON.parse(response.body);
   console.log(data);
   // console.log(response.body);
});

