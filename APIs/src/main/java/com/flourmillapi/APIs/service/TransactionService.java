//package com.flourmillapi.APIs.service;
//
//import com.flourmillapi.APIs.entity.Customer;
//import com.flourmillapi.APIs.entity.Transaction;
//import com.flourmillapi.APIs.repository.TransactionRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class TransactionService {
//
//    @Autowired
//    private TransactionRepository tranrepo;
//
//    // 1. it will create the new transaction if the transaction is not exist
//    // 2. if the transaction is exit then it will update it
//    // 3. one customer have many transaction
////    public Transaction addTransaction(Transaction tn) {
////        return tranrepo.save(tn);
////
////    }
//    public Transaction addTransaction(Transaction tn) {
//            tn.setTotal(tn.getQuantity() * tn.getUnitPrice());
//        // Fetch the customer based on the customer_id (many-to-one relationship)
//        // Save the transaction with the calculated total and customer name
//        return tranrepo.save(tn);
//    }
//
//
//    // 1. it will fetch the transaction based on customerId
//    public List<Transaction> getCustomerByCustomerId(Long customerId) {
//        return tranrepo.findByCustomerId(customerId);
//    }
//
//    public Transaction updateTransaction(Long id, Transaction transaction) {
//        transaction.setTotal(transaction.getQuantity() * transaction.getUnitPrice());
//       Optional<Transaction> existTransaction = tranrepo.findById(id);
//
//
//        if(existTransaction.isPresent()){
//            Transaction updatedTransaction = existTransaction.get();
////            updatedTransaction.setId(transaction.getId());
//            updatedTransaction.setFlourType(transaction.getFlourType());
//            updatedTransaction.setInTime(transaction.getInTime());
//            updatedTransaction.setOutTime(transaction.getOutTime());
//            updatedTransaction.setQuantity(transaction.getQuantity());
//            updatedTransaction.setTotal(transaction.getTotal());
//            updatedTransaction.setUnitPrice(transaction.getUnitPrice());
//
//            return tranrepo.save(updatedTransaction);
//
//        }else {
//            return null;
//        }
//    }
//
//    public void deleteTransaction(Long tranId) {
//        tranrepo.deleteById(tranId);
//    }
//}

package com.flourmillapi.APIs.service;

import com.flourmillapi.APIs.entity.Customer;
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

    // Create or update transaction
    public Transaction addTransaction(Transaction tn) {
        tn.setTotal(tn.getQuantity() * tn.getUnitPrice());

        // Set customerName if customer is not null
        if (tn.getCustomer() != null) {
            tn.setCustomerName(tn.getCustomer().getName());
        }

        return tranrepo.save(tn);
    }

    // Get all transactions by customerId
    public List<Transaction> getCustomerByCustomerId(Long customerId) {
        List<Transaction> transactions = tranrepo.findByCustomerId(customerId);
        // Populate customerName manually
        for (Transaction txn : transactions) {
            if (txn.getCustomer() != null) {
                txn.setCustomerName(txn.getCustomer().getName());
            }
        }
        return transactions;
    }

    // Update transaction
    public Transaction updateTransaction(Long id, Transaction transaction) {
        transaction.setTotal(transaction.getQuantity() * transaction.getUnitPrice());

        Optional<Transaction> existTransaction = tranrepo.findById(id);

        if (existTransaction.isPresent()) {
            Transaction updatedTransaction = existTransaction.get();

            updatedTransaction.setFlourType(transaction.getFlourType());
            updatedTransaction.setInTime(transaction.getInTime());
            updatedTransaction.setOutTime(transaction.getOutTime());
            updatedTransaction.setQuantity(transaction.getQuantity());
            updatedTransaction.setTotal(transaction.getTotal());
            updatedTransaction.setUnitPrice(transaction.getUnitPrice());
            updatedTransaction.setCustomer(transaction.getCustomer());

            // Set customerName again if available
            if (transaction.getCustomer() != null) {
                updatedTransaction.setCustomerName(transaction.getCustomer().getName());
            }

            return tranrepo.save(updatedTransaction);
        } else {
            return null;
        }
    }

    // Delete transaction by ID
    public void deleteTransaction(Long tranId) {
        tranrepo.deleteById(tranId);
    }

    public List<Transaction> getTransaction() {
        return tranrepo.findAll();
    }
}
