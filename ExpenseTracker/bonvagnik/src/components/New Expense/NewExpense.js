import './NewExpense.css';
import { useState } from 'react';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) =>{

    const saveExpenseData = (newData) =>{
        const newExpense={
            ...newData,
            id: Math.random().toString()
        };
        props.onAddExpense(newExpense);
        setEditing(false);
    }
    const [editing,setEditing]= useState(false);
    const editingHandler =() =>
    {
        setEditing(true);
    }
    const notEditingHandler =() =>
    {
        setEditing(false);
    } 

    if(editing===false)
        return (
            <div className="new-expense" >
                <button onClick={editingHandler} >Add Expense</button>
            </div>);

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseData} onCancel={notEditingHandler} />
        </div>
    );
}

export default NewExpense;