const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const resultElement = document.getElementById('result');
const bmiElement = document.getElementById('bmi');
const statusElement = document.getElementById('status');

const showResults = () => {
    resultElement.style.display = 'block';
}

const hideResults = () => {
    resultElement.style.display = 'none';
}

hideResults();

const calculateBMI = () => {
    const weight = weightInput.value;
    const height = heightInput.value;
    if(weight && height){
        const bmi = weight / (height ** 2);

        if(isNaN(bmi)) {
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

weightInput.addEventListener('input', calculateBMI);
heightInput.addEventListener('input', calculateBMI);

