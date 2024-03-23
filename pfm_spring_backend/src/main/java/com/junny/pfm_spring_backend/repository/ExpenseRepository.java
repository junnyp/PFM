package com.junny.pfm_spring_backend.repository;

import com.junny.pfm_spring_backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
