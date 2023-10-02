const input = document.querySelector("#input");
const btn = document.querySelector("#submit");
const temp = document.querySelector("#temp");

async function weather() {
  const inputValue = input.value;
  const API_key = "<YOUR API KEY>";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_key}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const temperature = Math.round(data.main.temp - 273.15);
      temp.innerHTML = temperature + "&deg; Celsius";
    } else {
      throw new Error("Weather data not found");
    }
  } catch (error) {
    console.log(error);
  }
}
