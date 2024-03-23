import React, {useState} from 'react';

function ExpenseForm({onExpenseAdded}) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = async (e) => {
        // Prevent form from refreshing page.
        e.preventDefault();

        const expense = {amount, category, description};

        try {
            const response = await fetch('http://localhost:8080/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expense),
            });
            if (!response.ok) {
                throw new Error('HTTP error! status: ${response.status}');
            }
            const data = await response.json();

            // Update UI by invoking callback with new expense.
            onExpenseAdded(data);
            
            // Clear form fields.
            setAmount('');
            setCategory('');
            setDescription('');

        } catch (error) {
            console.error('There was an error adding the expense:', error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    Amount:
                </label>
                <input
                    type = "number"
                    value = {amount}
                    onChange = {(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>
                    Category:
                </label>
                <select value = {category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value = "">Select a category</option>
                    <option value = "Groceries">Groceries</option>
                    <option value = "Rent">Rent</option>
                    <option value = "Entertainment">Entertainment</option>
                    <option value = "Gas">Gas</option>
                    <option value = "Other">Other</option>
                </select>
            </div>
            <div>
                <label>
                    Description:
                </label>
                <input 
                    type = "text"
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type = "submit">Add Expense</button>
        </form>
    );
}

export default ExpenseForm;