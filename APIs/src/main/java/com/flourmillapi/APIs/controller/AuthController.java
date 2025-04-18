//package com.flourmillapi.APIs.controller;
//
//import com.flourmillapi.APIs.entity.Admin;
//import com.flourmillapi.APIs.service.AdminService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Optional;
//
//@RestController

import com.flourmillapi.APIs.entity.Admin;
import com.flourmillapi.APIs.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

////@RequestMapping("/api/auth")
//public class AuthController {
//
//    // we have tells to spring to give object of AdminService class
//    // and inject to here using @Autowired
//    @Autowired
//    private AdminService adminService;
//
//    //ITs calling to AdminService class for checking creditionals
//    @PostMapping("/login")
//    public Optional<Admin> login(@RequestBody Admin loginData){
//        return adminService.login(loginData.getUsername(), loginData.getPassword());
//    }
//
//}

@RestController
@RequestMapping("/api/admin")
class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<Admin> admin = adminService.login(username, password);

        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
        }
    }

}
