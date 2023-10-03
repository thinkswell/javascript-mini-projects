document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateMortgage);

    function formatCurrency(value) {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
    }

    function calculateMortgage() {
        const homePrice = parseFloat(document.getElementById('homePrice').value);
        const downPayment = parseFloat(document.getElementById('downPayment').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value);
        const loanTerm = parseFloat(document.getElementById('loanTerm').value);

        if (isNaN(homePrice) || isNaN(downPayment) || isNaN(interestRate) || isNaN(loanTerm)) {
            alert("Please enter valid values.");
            return;
        }

        const monthlyInterestRate = (interestRate / 100) / 12;
        const numberOfPayments = loanTerm * 12;
        const loanAmount = homePrice - downPayment;

        const monthlyPayment = (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
        const totalLoanAmount = loanAmount + totalInterest;

        // Format the results using the formatCurrency function
        const formattedLoanAmount = formatCurrency(homePrice);
        const formattedMonthlyPayment = formatCurrency(monthlyPayment);
        const formattedTotalInterest = formatCurrency(totalInterest);
        const formattedTotalLoanAmount = formatCurrency(totalLoanAmount);

        // Calculate Monthly Interest
        const monthlyInterest = (loanAmount * monthlyInterestRate);
        const formattedMonthlyInterest = formatCurrency(monthlyInterest);

        // Calculate Monthly Principal
        const monthlyPrincipal = monthlyPayment - monthlyInterest;
        const formattedMonthlyPrincipal = formatCurrency(monthlyPrincipal);

        document.getElementById('totalLoanAmount').textContent = formattedLoanAmount;
        document.getElementById('monthlyPayment').textContent = formattedMonthlyPayment;
        document.getElementById('totalInterest').textContent = formattedTotalInterest;
        document.getElementById('totalLoanPayments').textContent = formattedTotalLoanAmount;
        document.getElementById('monthlyInterest').textContent = formattedMonthlyInterest;
        document.getElementById('monthlyPrincipal').textContent = formattedMonthlyPrincipal;

        // Display the result
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
    }
});
