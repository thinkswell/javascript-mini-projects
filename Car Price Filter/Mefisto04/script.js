const budgetSelect = document.getElementById('budget');
const cars = document.querySelectorAll('.car');

budgetSelect.addEventListener('change', filterCars);

function filterCars() {
    const selectedBudget = parseInt(budgetSelect.value);
    
    cars.forEach(car => {
        const carPrice = parseInt(car.querySelector('p').textContent.replace(/\D/g, ''));
        
        if (budgetSelect.value === 'all' || carPrice < selectedBudget) {
            car.style.display = 'block';
        } else {
            car.style.display = 'none';
        }
    });
}
