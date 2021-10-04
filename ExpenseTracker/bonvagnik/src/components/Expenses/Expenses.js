import './Expenses.css';
import ExpenseFilter from './ExpenseFilter';
import { useState } from 'react';
import ExpenseList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

const Expenses = (props) =>{

    const [filterYear,setFilterYear]= useState('2020');
    const filterHandler = (selectedYear) =>
    {
        setFilterYear(selectedYear);
        console.log(filterYear);
    }

    const filterExpenses= props.items.filter(expenses => {      /*expenses object points to items object*/ 
        return (expenses.date.getFullYear().toString()===filterYear);
    });
 
    return (
        <div>
        <div className="expenses">
            <ExpenseFilter default={filterYear} onFilterYear={filterHandler} />
            <ExpensesChart expenses={filterExpenses} />
            <ExpenseList items={filterExpenses} />
        </div>
        </div>
    );

}

export default Expenses;