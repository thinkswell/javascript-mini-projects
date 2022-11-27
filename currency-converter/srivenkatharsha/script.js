/**
 * Author:    Sri Venkat Harsha Rayasam
 * Created:   15.07.2022 
 **/


class CurrencyRate {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.fromCurrency = "";
        this.toCurrency = "";
        this.amount = 0;
    }
    start() {
        document.querySelector('.submit').addEventListener("click",
            () => {
                cr.search();
            }
        )

        document.querySelector('.targetValue').addEventListener("keyup",
            (event) => {
                if (event.key == "Enter") cr.search();
            }
        )

        document.querySelector('.swap').addEventListener("click",
            () => {
                cr.swap();
            }
        )
    }
    fetchConversionRate() {
        fetch("https://v6.exchangerate-api.com/v6/" + this.apiKey + "/pair/" + this.fromCurrency + "/" + this.toCurrency)
            .then(
                (res) => {
                    if (res.ok) { return res.json(); }
                    else {
                        alert('Something went wrong!');
                        return;
                    }
                }
            )
            .then(
                data => {
                    this.displayData(data);
                }
            )
            .catch(error => console.log("Unexpected error: " + error))
    }
    search() {
        const amountValue = document.querySelector('.amountText');
        const baseCurrency = document.querySelector('.baseValue');
        const targetCurrency = document.querySelector('.targetValue');
        this.amount = parseFloat(amountValue.value).toFixed(3);
        const error = document.querySelector('.error');
        if (isNaN(this.amount)) {
            error.style.visibility = "visible";
            return;
        }
        else {
            error.style.visibility = "hidden";
        }
        this.fromCurrency = baseCurrency.value;
        this.toCurrency = targetCurrency.value;
        console.log(this.amount + " " + this.fromCurrency + " " + this.toCurrency);
        this.fetchConversionRate();
    }
    displayData(data) {
        const { conversion_rate } = data;
        console.log("Conversion rate : " + conversion_rate);
        const amount = document.querySelector('.amount-value');
        amount.textContent = this.amount + " " + this.fromCurrency.toUpperCase() + " = " + (conversion_rate * this.amount).toFixed(3) + " " + this.toCurrency.toUpperCase();
        const conversion1 = document.querySelector('.exchange-rate-1');
        const conversion2 = document.querySelector('.exchange-rate-2');
        conversion1.textContent = "1 " + this.fromCurrency.toUpperCase() + " = " + conversion_rate + " " + this.toCurrency.toUpperCase();
        conversion2.textContent = "1 " + this.toCurrency.toUpperCase() + " = " + (1 / conversion_rate).toFixed(3) + " " + this.fromCurrency.toUpperCase();
        document.querySelector('.loading').classList.remove('loading');
    }
    swap() {
        const baseValue = document.querySelector('.baseValue');
        const targetValue = document.querySelector('.targetValue');
        let temp = baseValue.value;
        baseValue.value = targetValue.value;
        targetValue.value = temp;
    }
}

let cr = new CurrencyRate("YOUR-API-KEY");
cr.start();
