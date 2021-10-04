import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import {useState} from 'react';

const ExpenseItem = (expenses) =>{

    return (
        <div className="expense-item">
            <ExpenseDate date={expenses.date} /> {/*the date info from the expenses is given to props in ExpenseDate */}
            <div className="expense-item__description">
                <h2>{expenses.title}</h2>
                <div className="expense-item__price">${expenses.amount}</div>
            </div>
        </div>
    )
}

export default ExpenseItem;