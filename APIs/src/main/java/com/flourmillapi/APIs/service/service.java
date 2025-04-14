package com.flourmillapi.APIs.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class service {
    @RequestMapping("/")
    public String demo(){
        return "Hello World";
    }
}
