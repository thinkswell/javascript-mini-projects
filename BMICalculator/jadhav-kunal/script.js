const form = document.querySelector('#bmi-form');
const unitButtons = document.querySelectorAll('.unit-btn');
const heightLabel = document.querySelector('#height-label');
const weightLabel = document.querySelector('#weight-label');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const heightUnit = document.querySelector('#height-unit');
const weightUnit = document.querySelector('#weight-unit');
const resultsDiv = document.querySelector('#results');
const bmiNumber = document.querySelector('#bmi-number');
const categoryText = document.querySelector('#category-text');
const bmiRange = document.querySelector('#bmi-range');

let currentUnit = 'metric';

// Unit toggle functionality
unitButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        unitButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        currentUnit = this.dataset.unit;
        updateLabels();
        
        // Convert values if they exist
        if (heightInput.value || weightInput.value) {
            convertValues();
        }
    });
});

function updateLabels() {
    if (currentUnit === 'imperial') {
        heightLabel.textContent = 'Height (in)';
        weightLabel.textContent = 'Weight (lb)';
        heightUnit.textContent = 'in';
        weightUnit.textContent = 'lb';
    } else {
        heightLabel.textContent = 'Height (cm)';
        weightLabel.textContent = 'Weight (kg)';
        heightUnit.textContent = 'cm';
        weightUnit.textContent = 'kg';
    }
}

function convertValues() {
    if (currentUnit === 'imperial') {
        // Convert from metric to imperial
        if (heightInput.value) {
            heightInput.value = (parseFloat(heightInput.value) / 2.54).toFixed(2);
        }
        if (weightInput.value) {
            weightInput.value = (parseFloat(weightInput.value) / 0.453592).toFixed(2);
        }
    } else {
        // Convert from imperial to metric
        if (heightInput.value) {
            heightInput.value = (parseFloat(heightInput.value) * 2.54).toFixed(2);
        }
        if (weightInput.value) {
            weightInput.value = (parseFloat(weightInput.value) * 0.453592).toFixed(2);
        }
    }
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return {
            category: 'underweight',
            text: 'Underweight',
            range: 'Below 18.5'
        };
    } else if (bmi >= 18.5 && bmi < 25) {
        return {
            category: 'normal',
            text: 'Normal Weight',
            range: '18.5 - 24.9'
        };
    } else if (bmi >= 25 && bmi < 30) {
        return {
            category: 'overweight',
            text: 'Overweight',
            range: '25 - 29.9'
        };
    } else {
        return {
            category: 'obese',
            text: 'Obese',
            range: '30 and above'
        };
    }
}

function displayResults(bmi) {
    const categoryInfo = getBMICategory(bmi);
    
    // Remove all category classes
    resultsDiv.classList.remove('underweight', 'normal', 'overweight', 'obese');
    // Add the appropriate category class
    resultsDiv.classList.add(categoryInfo.category);
    
    // Animate BMI number
    animateValue(bmiNumber, 0, bmi, 1000);
    
    // Update category text and range
    categoryText.textContent = categoryInfo.text;
    bmiRange.textContent = `BMI Range: ${categoryInfo.range}`;
    
    // Show results
    resultsDiv.classList.remove('hidden');
    
    // Scroll to results smoothly
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = progress * (end - start) + start;
        element.textContent = current.toFixed(1);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end.toFixed(1);
        }
    };
    window.requestAnimationFrame(step);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let height = parseFloat(heightInput.value);
    let weight = parseFloat(weightInput.value);
    
    // Validation
    if (!height || height <= 0 || isNaN(height)) {
        showError('Please enter a valid height');
        heightInput.focus();
        return;
    }
    
    if (!weight || weight <= 0 || isNaN(weight)) {
        showError('Please enter a valid weight');
        weightInput.focus();
        return;
    }
    
    // Convert to metric if imperial
    if (currentUnit === 'imperial') {
        height = height * 2.54; // inches to cm
        weight = weight * 0.453592; // pounds to kg
    }
    
    // Validate converted values
    if (height < 50 || height > 300) {
        showError('Height should be between 50cm and 300cm (or equivalent)');
        return;
    }
    
    if (weight < 10 || weight > 500) {
        showError('Weight should be between 10kg and 500kg (or equivalent)');
        return;
    }
    
    // Calculate BMI: weight (kg) / height (m)²
    // Height is in cm, so we divide by 100 to get meters
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Display results
    displayResults(bmi);
});

function showError(message) {
    // Remove any existing error styling
    heightInput.style.borderColor = '';
    weightInput.style.borderColor = '';
    
    // Show error message (you could add a toast notification here)
    alert(message);
    
    // Add error styling to inputs
    if (!heightInput.value || heightInput.value <= 0) {
        heightInput.style.borderColor = '#ff6b6b';
    }
    if (!weightInput.value || weightInput.value <= 0) {
        weightInput.style.borderColor = '#ff6b6b';
    }
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        heightInput.style.borderColor = '';
        weightInput.style.borderColor = '';
    }, 3000);
}

// Add input validation on blur
heightInput.addEventListener('blur', function() {
    const value = parseFloat(this.value);
    if (this.value && (value <= 0 || isNaN(value))) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '';
    }
});

weightInput.addEventListener('blur', function() {
    const value = parseFloat(this.value);
    if (this.value && (value <= 0 || isNaN(value))) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '';
    }
});

// Allow Enter key to submit
heightInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        weightInput.focus();
    }
});

weightInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
});
