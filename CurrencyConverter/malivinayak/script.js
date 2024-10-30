let currencies;
const apiKey = 'YOUR_API_KEY'; // Replace with your API key

function initCurrencies(data) {
    currencies = Object.keys(data.rates);

    // Populate currency dropdowns
    const fromCurrencyDropdown = document.getElementById('fromCurrency');
    const toCurrencyDropdown = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        fromCurrencyDropdown.add(option);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.text = currency;
        toCurrencyDropdown.add(optionTo);
    });
}

function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    fetch(`https://openexchangerates.org/api/convert/${amount}?from=${fromCurrency}&to=${toCurrency}&app_id=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const convertedAmount = data.result;
            document.getElementById('result').innerText = convertedAmount.toFixed(2);
        })
        .catch(error => console.error('Error:', error));
}
