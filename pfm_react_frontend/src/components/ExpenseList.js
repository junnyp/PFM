import React from 'react';

function ExpenseList({expenses, onDeleteExpense}) {
    return (
        <div>
            <h2>Expenses</h2>
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            <div>{expense.date}</div>
                            <div>{expense.category}: ${expense.amount}</div>
                            <div>{expense.description}</div>
                            <button onClick = {() => onDeleteExpense(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>   
            ) : (
                <p>No expenses to display</p>
            )}
        </div>
    );
}

export default ExpenseList;
