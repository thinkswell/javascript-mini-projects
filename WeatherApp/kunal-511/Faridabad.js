async function fetchData() {
	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Faridabad';
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
	   tempFaridabad.innerHTML = result.temp;
	   feels_likeFaridabad.innerHTML = result.feels_like;
	   humidityFaridabad.innerHTML = result.humidity;
	   min_tempFaridabad.innerHTML = result.min_temp;
	   max_tempFaridabad.innerHTML = result.max_temp;
	   wind_speedFaridabad.innerHTML = result.wind_speed;
	   wind_degreesFaridabad.innerHTML = result.wind_degrees;
	   sunriseFaridabad.innerHTML = result.sunrise;
	   sunsetFaridabad.innerHTML = result.sunset;
  
	  // Use the retrieved data as needed
	  // ...
  
	} catch (error) {
	  console.error(error);
	}
  }
  
  fetchData();








  
  