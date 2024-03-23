// import React, {useState, useEffect} from 'react';

// function ExpenseList({expenses}) {
//     // State to hold expenses data
//     const [expenses, setExpenses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Function to fetch expenses data
//     const fetchExpenses = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/api/expenses');
//             if (!response.ok) {
//                 throw new Error('Data could not be fetched!');
//             } 
//             const data = await response.json();
//             setExpenses(data);
//             setLoading(false); // Data fetched, loading is done
//         } catch(error) {
//             console.error("There was a problem fetching the expenses:", error);
//             setError(error.message);
//             setLoading(false);
//         }
//     };

//     // useEffect to trigger fetchExpenses when the component mounts
//     useEffect(() => {
//         fetchExpenses();
//     }, []); // Empty array ensures this runs once on component mount

//     return (
//         <div>
//             <h2>
//                 Expenses
//             </h2>
//             {loading && <p>Loading expenses...</p>}
//             {error && <p>Error: {error}</p>}
//             {expenses.length > 0 ? (
//                 <ul>
//                     {expenses.map((expense) => (
//                         <li key = {expense.id}>
//                             {expense.date} - {expense.category}: ${expense.amount} - {expense.description}
//                         </li>
//                     ))}    
//                 </ul>
//             ) : (
//                 !loading && <p>No expenses to display</p>
//             )}
//         </div>
//     );
// }

// export default ExpenseList;

import React from 'react';

function ExpenseList({expenses}) {
    return (
        <div>
            <h2>Expenses</h2>
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {expense.date} - {expense.category}: ${expense.amount} - {expense.description}
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
