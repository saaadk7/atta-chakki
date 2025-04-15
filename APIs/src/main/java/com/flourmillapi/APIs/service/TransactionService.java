package com.flourmillapi.APIs.service;

import com.flourmillapi.APIs.entity.Transaction;
import com.flourmillapi.APIs.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository tranrepo;

    // 1. it will create the new transaction if the transaction is not exist
    // 2. if the transaction is exit then it will update it
    // 3. one customer have many transaction
    public Transaction saveTransaction(Transaction tn) {
        return tranrepo.save(tn);
    }

    // 1. it will fetch the transaction based on customerId
    public List<Transaction> getCustomerByCustomerId(Long customerId) {
        return tranrepo.findByCustomerId(customerId);
    }
}
