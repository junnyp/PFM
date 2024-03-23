package com.junny.pfm_spring_backend.service;

import com.junny.pfm_spring_backend.exceptions.ResourceNotFoundException;
import com.junny.pfm_spring_backend.model.Expense;
import com.junny.pfm_spring_backend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(final ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // Add new expense to my database.
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }
    // Fetch all expenses from my database.
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
    // Fetch an expense by ID.
    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id " + id));
    }
    // Update an existing expense by ID.
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Expense expense = getExpenseById(id);

        expense.setAmount(expenseDetails.getAmount());
        expense.setCategory(expenseDetails.getCategory());
        expense.setDescription(expenseDetails.getDescription());
        expense.setDate(expenseDetails.getDate());

        return expenseRepository.save(expense);
    }
    // Delete an expense by ID.
    public void deleteExpense(Long id) {
        Expense expense = getExpenseById(id);
        expenseRepository.delete(expense);
    }
}
