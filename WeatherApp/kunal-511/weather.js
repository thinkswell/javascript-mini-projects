// async function fetchData() {
// 	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle';
// 	const options = {
// 	  method: 'GET',
// 	  headers: {
// 		'X-RapidAPI-Key': '9ae224ae17msh167ad0acab752d5p1d336fjsn4e3fa840bf04',
// 		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
// 	  }
// 	};
  
// 	try {
// 	  const response = await fetch(url, options);
// 	  const result = await response.text();
// 	  console.log(result);
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   }
  
//   fetchData();
  



// async function fetchData() {
// 	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle';
// 	const options = {
// 	  method: 'GET',
// 	  headers: {
// 		'X-RapidAPI-Key': '9ae224ae17msh167ad0acab752d5p1d336fjsn4e3fa840bf04',
// 		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
// 	  }
// 	};
  
// 	try {
// 	  const response = await fetch(url, options);
// 	  const result = await response.text({
// 		console.log(result)

		
// 		cloud_pct = response.cloud_pct,
// 		temp = response.temp,
// 		 feels_like = response.feels_like,
// 		 humidity  = response.humidity,
// 		 min_temp = response.min_temp,
// 		  max_temp  = response.max_temp,
// 		  wind_speed  = response.wind_speed
// 		  wind_degrees = response.wind_degrees,
// 		   sunrise  = response.sunrise,
// 		   sunset = response.sunset,
// 	  })
	 
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   }
  
//   fetchData();


// RUNNING PROPERLY

// async function fetchData() {
// 	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Shanghai';
// 	const options = {
// 	  method: 'GET',
// 	  headers: {
// 		'X-RapidAPI-Key': '9ae224ae17msh167ad0acab752d5p1d336fjsn4e3fa840bf04',
// 		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
// 	  }
// 	};
  
// 	try {
// 	  const response = await fetch(url, options);
// 	  const result = await response.json();
// 	  console.log(result);
  
// 	   cloud_pct.innerHTML = result.cloud_pct;
// 	   temp.innerHTML = result.temp;
// 	   feels_like.innerHTML = result.feels_like;
// 	   humidity.innerHTML = result.humidity;
// 	   min_temp.innerHTML = result.min_temp;
// 	   max_temp.innerHTML = result.max_temp;
// 	   wind_speed.innerHTML = result.wind_speed;
// 	   wind_degrees.innerHTML = result.wind_degrees;
// 	   sunrise.innerHTML = result.sunrise;
// 	   sunset.innerHTML = result.sunset;
  
// 	  // Use the retrieved data as needed
// 	  // ...
  
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   }
  
//   fetchData();






const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': '9ae224ae17msh167ad0acab752d5p1d336fjsn4e3fa840bf04',
	  'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
  };
  
  const getWeather = (city) => {
	cityName.innerHTML = city
	 fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
	// fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city= '+ city, options)
	  .then(response => {
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
		return response.json();
	  })
	  .then(response => {
		console.log(response);
  
		// Update the HTML elements with weather data
		cloud_pct.innerHTML = response.cloud_pct;
		temp.innerHTML = response.temp;
		feels_like.innerHTML = response.feels_like;
		humidity.innerHTML = response.humidity;
		min_temp.innerHTML = response.min_temp;
		max_temp.innerHTML = response.max_temp;
		wind_speed.innerHTML = response.wind_speed;
		wind_degrees.innerHTML = response.wind_degrees;
		sunrise.innerHTML = response.sunrise;
		sunset.innerHTML = response.sunset;
	  })
	  .catch(err => console.error(err));
  };
submit.addEventListener("click", (e)=>{
	e.preventDefault()
	getWeather(city.value)
})  

getWeather("Delhi")















  
  