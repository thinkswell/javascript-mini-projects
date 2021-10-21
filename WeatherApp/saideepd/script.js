const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "345bd2da174e96615f3bc7e1197e871e";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    //Check if there's already a city
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //mumbai,in
            if (inputVal.includes(",")) {
                //mumbai,innnnn -> invalid country code, so we keep only the first part of inputVal
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el.querySelector(".city-name span").textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //mumbai
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if(filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent} 
                ...otherwise be more specific by providing the country code as well 😉`;
            form.reset();
            input.focus();
            return;
        }
    }

    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url).
        then(response => response.json()).
        then(data => {
            // do stuff with the data
            const { main, name, sys, weather } = data;
            // const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
                <h2 class="city-name" data-name="${name}, ${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
                    <div class="city-temp-data" style="font-weight: bold">Feels: ${Math.round(main.feels_like)}°C</div>
                    <div class="city-temp-data">Min: ${Math.round(main.temp_min)}°C  |  Max: ${Math.round(main.temp_max)}°C</div>
                </div>
                <figure>
                    <img class="city-icon" src=${icon} alt=${weather[0]["description"]}>
                    <figcaption>${weather[0]["description"]}</figcaption>
                </figure>
            `;
            li.innerHTML = markup;
            list.appendChild(li);
        }).
        catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    input.textContent = "";
    form.reset();
    input.focus();
});