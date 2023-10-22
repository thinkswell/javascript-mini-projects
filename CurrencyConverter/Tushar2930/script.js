const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from");
const toCurrencySelect = document.getElementById("to");
const convertButton = document.getElementById("convert");
const result = document.getElementById("result");
const convertedAmount = document.getElementById("converted-amount");

convertButton.addEventListener("click", () => {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount !== "" && fromCurrency !== toCurrency) {
        convertCurrency(amount, fromCurrency, toCurrency);
    }
});

var myHeaders = new Headers();
myHeaders.append("apikey", "6oeOtPvaT3rX63XWwcEzhPb2ap67d8qr");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    // const apiKey = "6oeOtPvaT3rX63XWwcEzhPb2ap67d8qr"; // Replace with your API key
    // const url = `https://api.apilayer.com/exchangerates_data/latest?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&apikey=${apiKey}`;

    console.log(fromCurrency, toCurrency, amount);
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    const conversionResult = result.result;
            console.log(conversionResult);
            if(conversionResult !== undefined){
                convertedAmount.innerHTML= conversionResult;
            result.style.display = "block";
            }
            
  })
  .catch(error => console.log('error', error));
    // fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         const conversionResult = data.result;
    //         console.log(data);
    //         convertedAmount.innerHTML= conversionResult;
    //         result.style.display = "block";
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });
}
