import React, {useEffect, useState} from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Header from './components/Header';
import ExpensePieChart from './components/Chart'

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from backend
    const fetchExpenses = async () => {
      const result = await fetch('http://localhost:8080/api/expenses');
      if (!result) {
        throw new Error('Failed to fetch!');
      }
      const data = await result.json();
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  
  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/expenses/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete the expense.');
        }
        // Filter out the deleted expense from the current state
        setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
        console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <Header />
      <ExpenseForm onExpenseAdded = {handleAddExpense} />
      <ExpenseList expenses = {expenses} onDeleteExpense = {handleDeleteExpense}/>
      <ExpensePieChart expenses={expenses} />
    </div>
  );
}

export default App;
