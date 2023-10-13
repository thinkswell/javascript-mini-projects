document.addEventListener("DOMContentLoaded", function() {
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const calculateButton = document.getElementById("calculate");
    const resultContainer = document.getElementById("result");

    calculateButton.addEventListener("click", function() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            resultContainer.textContent = "Please enter valid height and weight.";
            return;
        }

        const bmi = calculateBMI(height, weight);
        const category = getBMICategory(bmi);

        resultContainer.innerHTML = `Your BMI is: <span class="bmi">${bmi.toFixed(2)}</span><br>Category: <span class="category">${category}</span>`;
    });

    function calculateBMI(height, weight) {
        return weight / ((height / 100) * (height / 100));
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi < 24.9) {
            return "Normal Weight";
        } else if (bmi < 29.9) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }
});