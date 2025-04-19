package com.flourmillapi.APIs.service;

import com.flourmillapi.APIs.entity.Customer;
import com.flourmillapi.APIs.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // 1. if the cutomer is not exist in the Database its creates new
    // 2. if the customer is exist in the db then it will update that customer
    public Optional<Customer> addCustomer(Customer customer) {
        customerRepository.save(customer);
        return null;
    }

    // 1. it will return the all cutomer list
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    // 1. it will return the customer by its ID
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }



    public Customer updateCustomer(Long id,Customer customer) {
        Optional<Customer> existCustomer = customerRepository.findById(id);
        if (existCustomer.isPresent()) {
            Customer updatedCustomer = existCustomer.get();
            updatedCustomer.setName(customer.getName());
            updatedCustomer.setAddress(customer.getAddress());
            updatedCustomer.setPhone(customer.getPhone());

            return customerRepository.save(updatedCustomer);

        } else {
            return null;
        }


    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
