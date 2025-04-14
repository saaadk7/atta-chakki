package com.flourmillapi.APIs.controller;

import com.flourmillapi.APIs.entity.Admin;
import com.flourmillapi.APIs.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
//@RequestMapping("/api/auth")
public class AuthController {

    // we have tells to spring to give object of AdminService class
    // and inject to here using @Autowired
    @Autowired
    private AdminService adminService;

    //ITs calling to AdminService class for checking creditionals
    @PostMapping("/login")
    public Optional<Admin> login(@RequestBody Admin loginData){
        return adminService.login(loginData.getUsername(), loginData.getPassword());
    }

}
