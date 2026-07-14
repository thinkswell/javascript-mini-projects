const calculateBMI = () => {
    const weight = weightInput.value;
    const height = heightInput.value;

    if (weight && height) {

        // ✅ NEW VALIDATION (YOUR CONTRIBUTION)
        if (weight <= 0 || height <= 0) {
            bmiElement.innerHTML = '';
            statusElement.innerHTML = '';
            hideResults();
            return;
        }

        const bmi = weight / (height ** 2);

        if (isNaN(bmi)) {
            hideResults();
            return;
        }

        bmiElement.innerText = bmi.toFixed(2);

        if (bmi < 18.5) {
            statusElement.innerText = 'Underweight';
        } else if (bmi < 25) {
            statusElement.innerText = 'Normal';
        } else if (bmi < 30) {
            statusElement.innerText = 'Overweight';
        } else {
            statusElement.innerText = 'Obese';
        }

        showResults();
    } else {
        bmiElement.innerHTML = '';
        statusElement.innerHTML = '';
        hideResults();
    }
}
