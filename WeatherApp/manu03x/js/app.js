// Selectors

const container = document.querySelector('.container');
const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.addEventListener('load', () => {
    form.addEventListener('submit', weatherSearch)
})

function weatherSearch(e) {
    e.preventDefault();

   // Validation

   const city = document.querySelector('#ciudad').value;
   const country = document.querySelector('#pais').value;

   if (!city || !country) {
        showError('Required Fields');
        return;
   }

   weatherAPIQuery(city, country);

}

function showError(message) {

    const alert = document.querySelector('.error')
    if (!alert) {
        const alert = document.createElement('DIV');
        alert.classList.add('bg-red-100' , 'border-red-400','text-red-700','px-4', 'py-3','rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'error');

        alert.innerHTML = `
            <strong class="font-bold">Error</strong>
            <span class="block">${message}</span>
        `;

        container.appendChild(alert);


        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

}

function weatherAPIQuery(city, country) {
    const appId = 'f2606f96b862b4f8c474b2d2db0524a1';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`

    spinner();

    fetch(url)
        .then( response => response.json())
        .then( data => {
            clearHTML();
            if (data.cod === '404') {
                showError('City has not been found')
                return;
            }
            showWeather(data);
        })
}

function showWeather(data) {
    const { name, main: {temp, temp_max, temp_min} } = data; //Deep destructuring

    const celsius = kelvinToCelsius(temp);
    const min = kelvinToCelsius(temp_min);
    const max = kelvinToCelsius(temp_max);

    const actual = document.createElement('p');
    actual.innerHTML = `${celsius} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const cityName = document.createElement('p');
    cityName.textContent = `Weather at ${name}`;
    cityName.classList.add('font-bold', 'text-2xl');

    const maxTemp = document.createElement('P');
    maxTemp.innerHTML = `Max: ${max} &#8451`
    maxTemp.classList.add('text-xl');

    const minTemp = document.createElement('P');
    minTemp.innerHTML = `Min: ${min} &#8451`
    minTemp.classList.add('text-xl');


    const divResult = document.createElement('div');
    divResult.classList.add('text-center', 'text-white');
    divResult.appendChild(cityName);
    divResult.appendChild(actual);
    divResult.appendChild(maxTemp);
    divResult.appendChild(minTemp);

    result.appendChild(divResult);

}

const kelvinToCelsius = degrees => parseInt(degrees - 273.15);

function clearHTML() {
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

function spinner() {
    clearHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');

    result.appendChild(divSpinner);
}