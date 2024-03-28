import React from 'react';
import { formatMonthYear } from '../utils/dateUtils';

const ExpenseFilter = ({ filterOptions, currentFilter, onFilterChange }) => {
    return (
        <div>
            <select onChange = {onFilterChange} value ={currentFilter}>
                <option value = "all">All</option>
                {filterOptions.map(option => (
                    <option key = {option} value = {option}>{formatMonthYear(option)}</option>
                ))}
            </select>
        </div>
    );
};

export default ExpenseFilter;