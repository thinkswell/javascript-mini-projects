import Chart from "../Chart/Chart";

const ExpensesChart =(props)=>
{

    const chartDataPoints=[
        {label: 'Jan', value: 0},
        {label: 'Feb', value: 0},
        {label: 'Mar', value: 0},
        {label: 'Apr', value: 0},
        {label: 'May', value: 0},
        {label: 'Jun', value: 0},
        {label: 'Jul', value: 0},
        {label: 'Aug', value: 0},
        {label: 'Sep', value: 0},
        {label: 'Oct', value: 0},
        {label: 'Nov', value: 0},
        {label: 'Dec', value: 0}
    ];

    for(const expense of props.expenses)
    {
        const expenseMonth = expense.date.getMonth(); /* returns month in number from 0 to 11 which is the same in above arrar */
        chartDataPoints[expenseMonth].value += expense.amount;
    }

    return (
        <div>
            <Chart dataPoints={chartDataPoints} />
        </div>
    );
}

export default ExpensesChart;