package com.flourmillapi.APIs.controller;

import com.flourmillapi.APIs.entity.Customer;
import com.flourmillapi.APIs.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//@RequestMapping("/api")
//@CrossOrigin
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;


    // 1. its calls the service layer to add cutomer
    @PostMapping("/customers")
    public Optional<Customer> addCustomer(@RequestBody Customer customer) {
       return customerService.addCustomer(customer);
    }

    @PutMapping("/customers/{id}")
    public Customer updateCustomer(@PathVariable Long id,@RequestBody  Customer customer ){
         return customerService.updateCustomer(id,customer);
    }

    // 1. its call the service layer to fetch all customers
    @GetMapping("/customers")
    public List<Customer> getAll(){
        return customerService.getAllCustomer();
    }

    // 1. its calls the service layer to fetch the cutomer by its ID
    @GetMapping("/customers/{id}")
    public Optional<Customer> getById(@PathVariable Long id){
        return customerService.getCustomerById(id);
    }

    @DeleteMapping("/customers/{id}")
    public void deleteCustomer(@PathVariable Long id){
        customerService.deleteCustomer(id);
    }
}
