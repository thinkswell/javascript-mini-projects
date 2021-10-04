import './ExpenseForm.css';
import { useState } from 'react';

const ExpenseForm = (props) =>{

    const [newTitle,setNewTitle]= useState('');
    const [newAmount,setNewAmount]= useState('');
    const [newDate,setNewDate]= useState('');

    const titleHandler = (event) =>{
        setNewTitle(event.target.value);
    }
    const amountHandler = (event) =>{
        setNewAmount(event.target.value);
    }
    const dateHandler = (event) =>{
        setNewDate(event.target.value);
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        const expense={
            title: newTitle,
            amount: +newAmount,
            date: new Date(newDate)
        };
        props.onSaveExpenseData(expense);
        setNewTitle('');
        setNewAmount('');
        setNewDate('');
    }

    return (
        <form onSubmit={submitHandler}> 
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={newTitle} onChange={titleHandler}/> {/*HTML element acts as a component*/}
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="numver" min="0.1" step="0.1" value={newAmount} onChange={amountHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" max="2022-12-31" value={newDate} onChange={dateHandler} />
                </div>
            </div>
            <div className="new-expense__actions">
                <button className="button" onClick={props.onCancel} >Cancel</button>
                <button type="submit"  >Add Expense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;