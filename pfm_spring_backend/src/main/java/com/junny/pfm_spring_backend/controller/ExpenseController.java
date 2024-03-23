package com.junny.pfm_spring_backend.controller;

import com.junny.pfm_spring_backend.model.Expense;
import com.junny.pfm_spring_backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend origins (not for production environment)
@RequestMapping("/api/expenses") // Base path for all handlers in this controller.
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(final ExpenseService expenseService){
        this.expenseService = expenseService;
    }
    // Endpoint exposing method to add an expense.
    @PostMapping
    public ResponseEntity<Expense> addExpense(@Validated @RequestBody Expense expense) {
        Expense savedExpense = expenseService.saveExpense(expense);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
    }
    // Endpoint exposing method to retrieve all expenses.
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }
    // Endpoint exposing method to retrieve an expense by ID.
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        Expense expense = expenseService.getExpenseById(id);
        return ResponseEntity.ok(expense);
    }
    // Endpoint exposing method to update an expense by ID.
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Validated @RequestBody Expense expenseDetails) {
        Expense updatedExpense = expenseService.updateExpense(id, expenseDetails);
        return ResponseEntity.ok(updatedExpense);
    }
    //Endpoint exposing method to delete an expense by ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok().build();
    }

}
