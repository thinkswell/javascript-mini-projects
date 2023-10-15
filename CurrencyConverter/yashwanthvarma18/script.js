// Define an object with currency data
const currencies = {
    AED: "Arabic dirham",
    AFN: "Afghani",
    ALL: "Albanian Lek",
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    INR: "Indian Rupee",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CNY: "Chinese Yuan",
    CHF: "Swiss Franc",
    SEK: "Swedish Krona",
    NZD: "New Zealand Dollar",
    ZAR: "South African Rand",
    RUB: "Russian Ruble",
    BRL: "Brazilian Real",
    MXN: "Mexican Peso",
    SGD: "Singapore Dollar",
    KRW: "South Korean Won",
    THB: "Thai Baht",
    HKD: "Hong Kong Dollar",
    TRY: "Turkish Lira",
    ILS: "Israeli New Shekel",
    QAR: "Qatari Rial",
    SAR: "Saudi Riyal",
    PLN: "Polish Złoty",
    NOK: "Norwegian Krone",
    MYR: "Malaysian Ringgit",
    SYP: "Syrian Pound",
    NPR: "Nepalese Rupee",
    FJD: "Fiji Dollar",
    CLP: "Chilean Peso",
    PEN: "Peruvian Nuevo Sol",
    ARS: "Argentine Peso",
    VND: "Vietnamese Đồng",
    IRR: "Iranian Rial",
    EGP: "Egyptian Pound",
    AED: "United Arab Emirates Dirham",
    ZMW: "Zambian Kwacha",
};

// Define an object with conversion rates (to USD)
const conversionRates = {
    AED: 0.27,
    AFN: 0.013,
    ALL: 0.0092,
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 113.85,
    INR: 73.19,
    AUD: 1.36,
    CAD: 1.26,
    CNY: 6.38,
    CHF: 0.92,
    SEK: 8.77,
    NZD: 1.47,
    ZAR: 15.45,
    RUB: 75.34,
    BRL: 5.28,
    MXN: 20.07,
    SGD: 1.34,
    KRW: 1177.74,
    THB: 32.52,
    HKD: 7.77,
    TRY: 13.71,
    ILS: 3.26,
    QAR: 3.64,
    SAR: 3.75,
    PLN: 4.16,
    NOK: 9.12,
    MYR: 0.24,
    SYP: 0.0024,
    NPR: 0.0085,
    FJD: 0.48,
    CLP: 0.013,
    PEN: 0.25,
    ARS: 8.88,
    VND: 0.000043,
    IRR: 0.000023,
    EGP: 0.063,
    ZMW: 0.054,
};


function populateCurrencies() {
    const fromCurrencySelect = document.getElementById("from-currency");
    const toCurrencySelect = document.getElementById("to-currency");

    for (const currency in currencies) {
        const option1 = new Option(currency, currency);
        const option2 = new Option(currency, currency);
        fromCurrencySelect.add(option1);
        toCurrencySelect.add(option2);
    }
}

function convertCurrency() {
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const convertedAmountElement = document.getElementById("converted-amount");

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    const conversionRate = conversionRates[toCurrency] / conversionRates[fromCurrency];

    const convertedAmount = (amount * conversionRate).toFixed(2);
    convertedAmountElement.textContent = `${convertedAmount} ${toCurrency}`;
}

document.addEventListener("DOMContentLoaded", () => {
    populateCurrencies();
    document.getElementById("convert").addEventListener("click", convertCurrency);
});
