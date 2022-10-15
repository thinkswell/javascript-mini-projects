//Variables y selectores
let budget;
const form = document.querySelector('#agregar-gasto');
const budgetList = document.querySelector('#gastos ul');

// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', askBudget);
    form.addEventListener('submit', addExpenses)
}

//Classes
class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.remaining = Number(budget);
        this.expenses = [];
    }

    newExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.remainderCalc();
    }

    remainderCalc() {
        const spent = this.expenses.reduce((accumulated, expense) => accumulated + expense.total, 0) // Array objects props addition
        this.remaining = this.budget - spent;
    }

    deleteItem(id) {
        this.expenses = this.expenses.filter( expense => expense.id !== id);
        this.remainderCalc();
    }
}

class UI {
    appendBudget(total) {
        const {budget, remaining} = total;
        const budgetText = document.querySelector('#total');
        budgetText.textContent = budget

        const remainingText = document.querySelector('#restante');
        remainingText.textContent = remaining
    }

    showAlert(message, type) {
        //div
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert')

        if(type === 'error') {
            divMessage.classList.add('alert-danger')
        } else {
            divMessage.classList.add('alert-success')
        }
        //Error message
        divMessage.textContent = message;

        //Inserto into HTML

        document.querySelector('.primario').insertBefore(divMessage, form)

        //Remove from html

        setTimeout(() => {
            divMessage.remove()
        }, 2000)
    }

    addExpensesList(expenses) {
        this.clearHTML();
        expenses.forEach(expense => {
            const { total, name, id} = expense
            //Create a li
            const newExpense = document.createElement('li');
            newExpense.className = 'list-group-item d-flex justify-content-between align-items-center';
            newExpense.dataset.id = id;
            console.log(newExpense)

            //Add data to HTML
            newExpense.innerHTML = `
                ${name} <span class="badge badge-primary badge-pill"> $${total} </span>
            `;
            //Delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'delete-expense');
            deleteButton.innerHTML = 'Delete &times;'
            deleteButton.onclick = () => {
                deleteItem(id)
            }
            newExpense.appendChild(deleteButton)

            //Add to HTML

            budgetList.appendChild(newExpense)

        });
    }

    clearHTML() {
        while(budgetList.firstChild) {
            budgetList.removeChild(budgetList.firstChild)
        }
    }

    updateRemaining(remaining) {
        const remainingText = document.querySelector('#restante').textContent = remaining;

    }

    checkBudget(budgetObj) {
        const {budget, remaining} = budgetObj;
        const remainingDiv = document.querySelector('.restante')

        // Test 25%

        if((budget / 4) > remaining) {
            remainingDiv.classList.remove('alert-success', 'alert-warning');
            remainingDiv.classList.add('alert-danger');
        } else if((budget / 2) > remaining) {
            remainingDiv.classList.remove('alert-success');
            remainingDiv.classList.add('alert-warning');
        } else {
            remainingDiv.classList.remove('alert-danger', 'alert-warning');
            remainingDiv.classList.add('alert-success');
        }

        // if total is less than 0

        if(remaining <= 0) {
            this.showAlert('Empty budget', 'error');

            form.querySelector('button[type= "submit"]').disabled = true;
        }
    }
}
// Instanciar

const ui = new UI()

//Funciones

function askBudget() {
    const userBudget = prompt('What is your budget?');

    if(userBudget === '' || userBudget === null || isNaN(userBudget) || userBudget <= 0) {
        window.location.reload();
    }
    //Presuspuesto valido
    budget = new Budget(userBudget);

    ui.appendBudget(budget);
}

function addExpenses(e) {
    e.preventDefault();

    //Read form

    const name = document.querySelector('#gasto').value;
    const total = Number(document.querySelector('#cantidad').value);
    //Validation
    if(name === '' || total === '') {
        ui.showAlert('Required inputs', 'error');
        return;
    } else if (total <= 0 || isNaN(total)) {
        ui.showAlert('Invalid value', 'error');
        return;
    }

    //Object literal enhancement
    const expense = { name, total, id: Date.now() }
    budget.newExpense(expense)
    // Mensaje de exito
    ui.showAlert('Added')
    // Imprimir gastos
    const {expenses, remaining} = budget;
    ui.updateRemaining(remaining);
    ui.addExpensesList(expenses);
    ui.checkBudget(budget);

    //Reinicia el formulario
    form.reset()
}

function deleteItem(id) {
    budget.deleteItem(id);
    const {expenses, remaining} = budget;

    ui.addExpensesList(expenses);
    ui.updateRemaining(remaining);
    ui.checkBudget(budget);
}



