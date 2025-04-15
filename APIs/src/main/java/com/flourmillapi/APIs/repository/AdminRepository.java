package com.flourmillapi.APIs.repository;

import com.flourmillapi.APIs.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    // 1.we used optional type because if the admin is not found default its show null
    // 2. but we want empty and Optional provide empty
    Optional<Admin> findByUsername(String username);
}
