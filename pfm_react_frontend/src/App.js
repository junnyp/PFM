import React, { useEffect, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Header from './components/Header';
import ExpensePieChart from './components/Chart';
import ExpenseFilter from './components/ExpenseFilter';
import { getUniqueMonths, sortExpensesByDate } from './utils/dateUtils';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  // First mount effects.
  useEffect(() => {
    // Fetch expenses from backend
    const fetchExpenses = async () => {
      // Captures exceptions related to initiating fetch request (network errors).
      try {
        const result = await fetch('http://localhost:8080/api/expenses');
        // Handle HTTP response errors.
        if (!result) {
          throw new Error('Failed to fetch!');
        } 
        let data = await result.json();
        data = sortExpensesByDate(data);
        // Sets contents of Expense List on first mount.
        setExpenses(data);
      } catch(error) {
        console.error("Error fetching expenses:",error);
      }
    };

    fetchExpenses();
  }, []);

  // Effect whenever 'expenses' changes (add/delete) and on first mount.
  useEffect(() => {
    // Set filter options.
    const uniqueMonths = getUniqueMonths(expenses);
    setFilterOptions(uniqueMonths);
  }, [expenses]);

  const handleFilterChange = (e) => {
    setCurrentFilter(e.target.value);
  }

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = sortExpensesByDate([...expenses, newExpense]);
    setExpenses(updatedExpenses);
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

  // Returns an array of expenses that match the current filter option.
  const filteredExpenses = expenses.filter(expense => {
    // Directly compare the 'YYYY-MM' portion of the date strings
    const expenseYearMonth = expense.date.substring(0, 7);
    return currentFilter === 'all' ? true : expenseYearMonth === currentFilter;
  });
  return (
    <div>
      <Header />
      <div className="filter-and-form">
        <ExpenseFilter filterOptions={filterOptions} currentFilter={currentFilter} onFilterChange={handleFilterChange}/>
        <ExpenseForm onExpenseAdded={handleAddExpense}/>
      </div>
      <div className="chart-and-list">
        <ExpensePieChart expenses={filteredExpenses}/>
        <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense}/>
      </div>
    </div>
  );
  
}

export default App;
