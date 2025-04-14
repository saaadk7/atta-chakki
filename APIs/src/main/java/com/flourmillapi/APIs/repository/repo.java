package com.flourmillapi.APIs.repository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class repo {
    @RequestMapping("/")
    public String demo(){
        return "Hello World";
    }
}
