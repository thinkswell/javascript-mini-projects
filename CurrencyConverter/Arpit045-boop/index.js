const currencyOne =document.getElementById('currency-one');
const amountOne =document.getElementById('amount-one');
const currencyTwo =document.getElementById('currency-two');
const amountTwo =document.getElementById('amount-two');
const swap =document.getElementById('swap');
const rate =document.getElementById('rate');


function calculate(){
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  fetch(" https://v6.exchangerate-api.com/v6/3e8ffaddefcdd36522ddc01f/latest/USD")
  .then(res => res.json())
  .then(data=>{
    // console.log(data);
    const rate_new=data.conversion_rates[currency_two]/data.conversion_rates[currency_one];
    rate.innerText= `1 ${currency_one} = ${rate_new.toFixed(2)} ${currency_two}`;
    amountTwo.value=(amountOne.value*(rate_new)).toFixed(2);
  });
}

// event listener
currencyOne.addEventListener('change',calculate);
amountOne.addEventListener('input',calculate);
currencyTwo.addEventListener('change',calculate);
amountTwo.addEventListener('input',calculate);

swap.addEventListener('click',()=>{
  const temp=currencyOne.value;
  currencyOne.value=currencyTwo.value;
  currencyTwo.value=temp;
  calculate();
});

// calculate();
