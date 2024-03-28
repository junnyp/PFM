// Return array of unique years and months chronologically.
export const getUniqueMonths = (expenses) => {
    const allMonths = expenses.map(expense => {
        // Convert to YYYY-MM format.
        return expense.date.substring(0, 7);
    });

    // Use Set data structure to eliminate duplicates.
    const uniqueMonths = Array.from(new Set(allMonths));
    
    // Sort array chronologically.
    uniqueMonths.sort((a, b) => a.localeCompare(b));

    return uniqueMonths;
}

// Convert YYYY-MM  formatting to 'Month' 'YYYY'.
export const formatMonthYear = (yearMonth) => {
    const [year, month] = yearMonth.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
};

export const sortExpensesByDate = (expenses) => {
    return expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
};