package com.flourmillapi.APIs.controller;

import com.flourmillapi.APIs.entity.Transaction;
import com.flourmillapi.APIs.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // 1. its call the service layer to add or update the transaction of the customer
    @PostMapping("/customers")
    public Transaction addTransaction(@RequestBody Transaction tn){
        return transactionService.saveTransaction(tn);
    }

    // 1. it is calling the service layer to fetch the transaction of particular customer
    @GetMapping("/customers/{customerId}")
    public List<Transaction> getCustomerById(@PathVariable Long customerId){
        return transactionService.getCustomerByCustomerId(customerId);
    }
}
