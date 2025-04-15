package com.flourmillapi.APIs.service;

import com.flourmillapi.APIs.entity.Transaction;
import com.flourmillapi.APIs.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository tranrepo;

    // 1. it will create the new transaction if the transaction is not exist
    // 2. if the transaction is exit then it will update it
    // 3. one customer have many transaction
    public Transaction addTransaction(Transaction tn) {
        return tranrepo.save(tn);
    }

    // 1. it will fetch the transaction based on customerId
    public List<Transaction> getCustomerByCustomerId(Long customerId) {
        return tranrepo.findByCustomerId(customerId);
    }

    public Transaction updateTransaction(Long id, Transaction transaction) {
       Optional<Transaction> existTransaction = tranrepo.findById(id);

        if(existTransaction.isPresent()){
            Transaction updatedTransaction = existTransaction.get();
//            updatedTransaction.setId(transaction.getId());
            updatedTransaction.setFlourType(transaction.getFlourType());
            updatedTransaction.setInTime(transaction.getInTime());
            updatedTransaction.setOutTime(transaction.getOutTime());
            updatedTransaction.setQuantity(transaction.getQuantity());
            updatedTransaction.setTotal(transaction.getTotal());
            updatedTransaction.setUnitPrice(transaction.getUnitPrice());

            return tranrepo.save(updatedTransaction);

        }else {
            return null;
        }
    }
}
