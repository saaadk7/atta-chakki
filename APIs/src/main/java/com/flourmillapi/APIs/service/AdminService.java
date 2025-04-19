package com.flourmillapi.APIs.service;

import com.flourmillapi.APIs.entity.Admin;
import com.flourmillapi.APIs.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminrepo;

    public Optional<Admin> login(String username, String password){
        // 1. its find the admin by its username
        // 2. if the admin finded the its uses Stream API to checks
        // 3. its checks if the finded admin password matched to the input password its same or not
        // 4. if the the password its matchec then it will give the login
        // 5. if the input username founded its check password
        // 6. if the input username not founded its shows empty or if the password not correct then its shows Exception
        return adminrepo.findByUsername(username)
                .filter(admin -> admin.getPassword().equals(password));
    }

    public Optional<Admin> addAdmin(Admin admin) {
        adminrepo.save(admin);
        return null;
    }

    public List<Admin> getAdmin() {
        return adminrepo.findAll();
    }
}
