const conversionRates = {
  us_dollar: 0.012,
  riyal: 0.045,
  euro: 0.0109,
  cad: 0.0163,
  yen: 1.7786,
  rub: 1.0689,
  won: 15.5345,
  sgd: 0.0163,
  yuan: 0.0855,
};

document.getElementById("submit").addEventListener("click", run);
document.getElementById("reset").addEventListener("click", resetForm);

function run() {
  const input = document.getElementById("num1");
  const userInput = Number(input.value);

  if (isNaN(userInput)) {
    alert("Please enter a valid number.");
    return;
  }

  convertCurrency(userInput);
}

function resetForm() {
  document.getElementById("num1").value = 0;
  clearResults();
}

function convertCurrency(amountInINR) {
  clearResults();

  for (const currencyCode in conversionRates) {
    const convertedAmount = amountInINR * conversionRates[currencyCode];
    displayResult(currencyCode, convertedAmount.toFixed(2));
  }
}

function clearResults() {
  const resultList = document.getElementById("mylist");
  resultList.innerHTML = '';
}

function displayResult(currencyCode, convertedAmount) {
  const countryNames = {
    us_dollar: "USA",
    riyal: "Saudi Arabia",
    euro: "Europe",
    cad: "Canada",
    yen: "Japan",
    rub: "Russia",
    won: "Korea",
    sgd: "Singapore",
    yuan: "China",
  };

  const currencyNames = {
    us_dollar: "Dollar",
    riyal: "Riyal",
    euro: "Euro",
    cad: "Dollar",
    yen: "Yen",
    rub: "Rub",
    won: "Won",
    sgd: "Dollar",
    yuan: "Yuan",
  };

  const resultList = document.getElementById("mylist");
  const listItem = document.createElement("li");
  listItem.innerText = `${countryNames[currencyCode]} ${currencyNames[currencyCode]}: ${convertedAmount}`;
  resultList.appendChild(listItem);
}
