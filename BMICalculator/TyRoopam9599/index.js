const form = document.querySelector("form");
const units = document.querySelector("#units");
const heightLabel = document.querySelector("#height-label");
const weightLabel = document.querySelector("#weight-label");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const inputValues = Object.fromEntries(formData);
  let height = +inputValues.height;
  let weight = +inputValues.weight;
  const results = document.querySelector("#results");
  const bmiresult = document.querySelector("#bmiresult");
  if (units.value === "Imperial") {
    height = height * 2.54;
    weight = weight * 0.453592;
    console.log(units.value);
  }
  if (height === "" || height < 0 || isNaN(height)) {
    //NaN !== NaN
    results.innerHTML = "Please provide a valid height";
  } else if (weight === "" || weight < 0 || isNaN(weight)) {
    results.innerHTML = "Please provide a valid weight";
  } else {
    //calculate BMI
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    //display the results
    results.innerHTML = `<span>${bmi}</span>`;
    if (bmi <= 16) bmiresult.innerHTML = "<h2>Severe Thinness</h2>";
    else if (bmi > 16 && bmi <= 17)
      bmiresult.innerHTML = "<h2>Moderate Thinness</h2>";
    else if (bmi > 17 && bmi <= 18.5)
      bmiresult.innerHTML = "<h2>Mild Thinness</h2>";
    else if (bmi > 18.5 && bmi <= 25) bmiresult.innerHTML = "<h2>Normal</h2>";
    else if (bmi > 25 && bmi <= 30) bmiresult.innerHTML = "<h2>Overweight</h2>";
    else if (bmi > 30 && bmi <= 35)
      bmiresult.innerHTML = "<h2>Obese Class I</h2>";
    else if (bmi > 35 && bmi <= 40)
      bmiresult.innerHTML = "<h2>Obese Class II</h2>";
    else bmiresult.innerHTML = "<h2>Obese Class III</h2>";
  }
});

// Allow user to change between metric and imperial.
units.addEventListener("change", (e) => {
  if (e.target.value === "Imperial") {
    height.placeholder = "Height in IN";
    weight.placeholder = "Weight in LB";

    if (height.value) {
      // convert current input to imperial
      height.value = (+height.value / 2.54).toFixed(2);
      weight.value = (+weight.value / 0.453592).toFixed(2);
    }
  } else {
    height.placeholder = "Height in CM";
    weight.placeholder = "Weight in KG";

    if (height.value) {
      // convert current input to metric
      height.value = (+height.value * 2.54).toFixed(2);
      weight.value = (+weight.value * 0.453592).toFixed(2);
    }
  }
});
