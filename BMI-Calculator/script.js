function BMI() {
  let height = document.getElementById("h").value;
  let weight = document.getElementById("w").value;
  let bmi = weight / (((height / 100) * height) / 100);
  let bmio = bmi.toFixed(2);

  document.getElementById("result").innerHTML = "Your BMI is " + bmio;
}
