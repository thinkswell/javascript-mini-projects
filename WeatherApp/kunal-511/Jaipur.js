async function fetchData() {
	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Jaipur';
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
	   tempJaipur.innerHTML = result.temp;
	   feels_likeJaipur.innerHTML = result.feels_like;
	   humidityJaipur.innerHTML = result.humidity;
	   min_tempJaipur.innerHTML = result.min_temp;
	   max_tempJaipur.innerHTML = result.max_temp;
	   wind_speedJaipur.innerHTML = result.wind_speed;
	   wind_degreesJaipur.innerHTML = result.wind_degrees;
	   sunriseJaipur.innerHTML = result.sunrise;
	   sunsetJaipur.innerHTML = result.sunset;
  
	  // Use the retrieved data as needed
	  // ...
  
	} catch (error) {
	  console.error(error);
	}
  }
  
  fetchData();








  
  