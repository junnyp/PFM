package com.junny.pfm_spring_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    @NotBlank(message = "Category cannot be blank!")
    private String category;
    @NotNull(message = "Amount cannot be null!")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0!")
    private BigDecimal amount;
    private LocalDate date;

    // Constructor
    public Expense(Long id, String description, String category, BigDecimal amount, LocalDate date){
        this.id = id;
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.date = date;
    }

    // No arg constructor
    public Expense() {

    }

    // Getters
    public Long getId(){
        return id;
    }
    public String getDescription(){
        return description;
    }
    public String getCategory(){
        return category;
    }
    public BigDecimal getAmount(){
        return amount;
    }
    public LocalDate getDate(){
        return date;
    }

    // Setters
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
}
