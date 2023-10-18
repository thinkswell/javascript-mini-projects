document.getElementById('getApi').addEventListener('click', getApi);
const apiId= 'e10925a3c2c948bf9a7205019223009';
function getApi() {
    var CityName = document.getElementById('cityName').value;
console.log(CityName)
const url = `http://api.weatherapi.com/v1/current.json?key=${apiId}&q=${CityName}&aqi=yes`;
console.log(url);
fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let output = `
            <div>
                <div style="color:black; width:12rem; background-color:white; border-radius: 10px;" class="p-3">
                    <p class="m-0" style="font-width:bold; font-size:2rem;">${data.location.name}</p>
                    <p class="m-0" style="font-width:bold; font-size:4rem;"> ${data.current.temp_c}<sup>°C</sup></p>
                </div>
            </div>
            `;
        console.log('printing data', data);
        document.getElementById('output').innerHTML = output;
    }).catch((err) => console.log(err))
}
