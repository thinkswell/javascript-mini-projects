// Existing Number Guessing Game Code (above this section)

// Simple Interest Calculator Code
const calculateButton = document.getElementById("calculate-button");
calculateButton.addEventListener("click", function() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const time = parseFloat(document.getElementById("time").value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
        document.getElementById("simple-interest-result").textContent = "Please enter valid positive numbers.";
    } else {
        const simpleInterest = (principal * rate * time) / 100;
        document.getElementById("simple-interest-result").textContent = `Simple Interest: $${simpleInterest.toFixed(2)}`;
    }
});

// Existing Number Guessing Game Code (below this section)
