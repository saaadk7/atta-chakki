package com.flourmillapi.APIs.repository;

import com.flourmillapi.APIs.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // we will used buit in function of JPARepo
}
