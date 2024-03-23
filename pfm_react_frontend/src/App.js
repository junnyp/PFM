import React, {useEffect, useState} from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Header from './components/Header';

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

  return (
    <div>
      <Header />
      <ExpenseForm onExpenseAdded = {handleAddExpense} />
      <ExpenseList expenses = {expenses} />
    </div>
  );
}

export default App;
