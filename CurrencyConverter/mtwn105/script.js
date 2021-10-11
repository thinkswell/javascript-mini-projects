// import axios from "axios";

const FIXER_API_KEY = "YOUR_FIXER_KEY_HERE";

let symbols = [];

let currenyFrom = "USD";
let currencyTo = "EUR";

getCurrencySymbols = async () => {
  const url = "http://data.fixer.io/api/symbols?access_key=" + FIXER_API_KEY;

  try {
    if (!localStorage.getItem("symbols")) {
      const res = await axios.get(url);

      symbols = res.data.symbols;

      localStorage.setItem("symbols", JSON.stringify(symbols));
    } else {
      symbols = JSON.parse(localStorage.getItem("symbols"));
    }

    console.log("SYMBOLS -> ", symbols);

    const currencyDropdowns = document.querySelectorAll("select");

    for (let selectOptions of currencyDropdowns) {
      for (let symbol of Object.keys(symbols)) {
        const option = document.createElement("option");
        option.text = symbol;
        option.value = symbol;
        selectOptions.add(option);
      }
      if (selectOptions.id == "fromCurrency") {
        selectOptions.value = currenyFrom;
      } else {
        selectOptions.value = currencyTo;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

getCurrencySymbols();

convert = async () => {
  console.log("CONVERTING...");

  const inputVal = document.getElementById("inputValue").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  const url = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}&symbols=${fromCurrency},${toCurrency}`;

  try {
    const res = await axios.get(url);

    const rates = res.data.rates;

    const exchangeRate = rates[toCurrency] / rates[fromCurrency];

    const convertedValue = inputVal * exchangeRate;

    const outputVal = document.getElementById("outputValue");
    outputVal.innerText =
      Math.round((convertedValue + Number.EPSILON) * 100) / 100;
  } catch (err) {
    console.error(err);
  }
};
