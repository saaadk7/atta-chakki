package com.flourmillapi.APIs.controller;

import com.flourmillapi.APIs.entity.Transaction;
import com.flourmillapi.APIs.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
//@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // 1. its call the service layer to add or update the transaction of the customer
    @PostMapping("/transactions")
    public void addTransaction(@RequestBody Transaction tn){
         transactionService.addTransaction(tn);
    }




    // 1. updating the transaction of particular Customer
    @PutMapping("/transactions/{id}")
    public Transaction updateTransaction(@PathVariable Long id , @RequestBody Transaction transaction){
        return transactionService.updateTransaction(id,transaction);
    }

    // 1. it is calling the service layer to fetch the transaction of particular customer
    @GetMapping("/transactions/{customerId}")
    public List<Transaction> getCustomerById(@PathVariable Long customerId){
        return transactionService.getCustomerByCustomerId(customerId);
    }
}
