async function fetchData() {
	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=London';
	const options = {
	  method: 'GET',
	  headers: {
		'X-RapidAPI-Key': '9ae224ae17msh167ad0acab752d5p1d336fjsn4e3fa840bf04',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	  }
	};
  
	try {
	  const response = await fetch(url, options);
	  const result = await response.json();
	  console.log(result);
  
	  // cloud_pct.innerHTML = result.cloud_pct;
	   tempLondon.innerHTML = result.temp;
	   feels_likeLondon.innerHTML = result.feels_like;
	   humidityLondon.innerHTML = result.humidity;
	   min_tempLondon.innerHTML = result.min_temp;
	   max_tempLondon.innerHTML = result.max_temp;
	   wind_speedLondon.innerHTML = result.wind_speed;
	   wind_degreesLondon.innerHTML = result.wind_degrees;
	   sunriseLondon.innerHTML = result.sunrise;
	   sunsetLondon.innerHTML = result.sunset;
  
	  // Use the retrieved data as needed
	  // ...
  
	} catch (error) {
	  console.error(error);
	}
  }
  
  fetchData();








  
  