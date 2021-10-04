import ExpenseItem from './ExpenseItem'
import './ExpensesList.css'

const ExpenseList = (props) =>
{

    if(props.items.length===0)
        return(<h2 className="expenses-list__fallback">No item found</h2>);
     
   return (
       <li className="expenses-list">
            {props.items.map( (expenses) => (   
            <ExpenseItem 
                key={expenses.id}       /*removes excessive rendering and bugs*/
                title={expenses.title}
                amount={expenses.amount}
                date={expenses.date} />
            ))}     {/*map implements ExpenseItem for each array element in filterExpenses*/ }
       </li>
   );

}

export default ExpenseList;