package com.flourmillapi.APIs.entity;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class entity {
    @RequestMapping("/")
    public String demo(){
        return "Hello World";
    }
}
