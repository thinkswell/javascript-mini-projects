// Include api for currency change
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// For selecting different controls
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrecy = document.querySelector(".from");
let toCurrecy = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

// Event when currency is changed
fromCurrecy.addEventListener("change", (event) => {
  resultFrom = `${event.target.value}`;
});

// Event when currency is changed
toCurrecy.addEventListener("change", (event) => {
  resultTo = `${event.target.value}`;
});

search.addEventListener("input", updateValue);

// Function for updating value
function updateValue(e) {
  searchValue = e.target.value;
}

// When user clicks, it calls function getresults
convert.addEventListener("click", getResults);

// Function getresults
function getResults() {
  fetch(`${api}`)
    .then((currency) => {
      return currency.json();
    })
    .then(displayResults);
}

// Display results after conversion
function displayResults(currency) {
  let fromRate = currency.rates[resultFrom];
  let toRate = currency.rates[resultTo];
  finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
  finalAmount.style.display = "block";
}

// When user click on reset button
function clearVal() {
  window.location.reload();
  document.getElementsByClassName("finalValue").innerHTML = "";
}
