package com.flourmillapi.APIs.dto;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class dto {
    @RequestMapping("/")
    public String demo(){
        return "Hello World";
    }
}
