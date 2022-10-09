document.querySelector(".search-box").addEventListener("input", async (e) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const today = new Date();
  const search_city = e.target.value;
  console.log(search_city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search_city}&units=metric&appid=01525b1923322486597bf9c18edb85a3`;
  try {
    const res = await fetch(url);
    const output = await res.json();
    console.log(output);
    document.querySelector(".city").innerHTML =
      output.name + " , " + output.sys.country;
    document.querySelector(".date").innerHTML =
      days[today.getDay()] +
      " " +
      today.getDate() +
      " " +
      months[today.getMonth()] +
      " " +
      today.getFullYear();
    document.querySelector(".temp").innerHTML = output.main.temp + "°c";
    document.querySelector(".weather").innerHTML = output.weather[0].main;
    document.querySelector(".hi-low").innerHTML =
      output.main.temp_min + "°c / " + output.main.temp_max + "°c";
  } catch (e) {
    console.log(e.message);
  }
});
