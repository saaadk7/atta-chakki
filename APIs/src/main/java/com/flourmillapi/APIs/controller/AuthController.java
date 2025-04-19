package com.flourmillapi.APIs.controller;

import com.flourmillapi.APIs.entity.Admin;
import com.flourmillapi.APIs.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController

//@RequestMapping("/api/auth")
//@RequestMapping("/api/admin")

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

    @PostMapping("/login/add")
    public Optional<Admin> addAdmin(@RequestBody Admin admin){
       return  adminService.addAdmin(admin);
    }

    @GetMapping("/getAllAdmin")
    public List<Admin> getAdmin(){
        return adminService.getAdmin();
    }


}
