package com.flourmillapi.APIs.repository;

import com.flourmillapi.APIs.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // 1. we will show transactions based on customer
    // 2. one customer have many transactions
    // 3. it will give a list of transactions of particular customer
    List<Transaction> findByCustomerId(long customerId);
}
