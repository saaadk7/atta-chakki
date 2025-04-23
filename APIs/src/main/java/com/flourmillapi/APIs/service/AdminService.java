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

//    public Optional<Admin> login(String username, String password){
//        // 1. its find the admin by its username
//        // 2. if the admin finded the its uses Stream API to checks
//        // 3. its checks if the finded admin password matched to the input password its same or not
//        // 4. if the the password its matchec then it will give the login
//        // 5. if the input username founded its check password
//        // 6. if the input username not founded its shows empty or if the password not correct then its shows Exception
//        return adminrepo.findByUsername(username)
//                .filter(admin -> admin.getPassword().equals(password));
//    }

    public Optional<Admin> login(String username, String password){
        // 1. Find the admin by username
        Optional<Admin> adminOptional = adminrepo.findByUsername(username);

        // 2. If admin is not found, return empty Optional
        if (!adminOptional.isPresent()) {
            return Optional.empty();
        }

        Admin admin = adminOptional.get();

        // 3. Check if the password matches
        if (!admin.getPassword().equals(password)) {
            return Optional.empty();  // return empty if password is incorrect
        }

        // 4. Check if the admin account is active
        if (!admin.isStatus()) {
            return Optional.empty();  // return empty if admin is deactivated
        }

        // 5. Return admin if password matches and account is active
        return Optional.of(admin);
    }


    public Optional<Admin> addAdmin(Admin admin) {
        adminrepo.save(admin);
        return null;
    }

    public List<Admin> getAdmin() {
        return adminrepo.findAll();
    }

    public Admin updateAdmin(Long id, Admin admin) {
       Optional<Admin> existAdmin = adminrepo.findById(id);
       if(existAdmin.isPresent()){
           Admin updatedAdmin = existAdmin.get();
           updatedAdmin.setUsername(admin.getUsername());
           updatedAdmin.setStatus(admin.isStatus());
           return  adminrepo.save(updatedAdmin);
    }
        return null;
    }

    public void deleteAdmin(Long id) {
        Optional<Admin> existAdmin = adminrepo.findById(id);
        if(existAdmin.isPresent()){
            Admin updateAdmin = existAdmin.get();
            if(updateAdmin.isSuperAdmin()==false){
                adminrepo.deleteById(id);
            }

        }
    }

    public Admin toggelStatus(Long id) {
        Admin admin = adminrepo.findById(id).orElseThrow();
        admin.setStatus(!admin.isStatus());
        return adminrepo.save(admin);
    }
}
