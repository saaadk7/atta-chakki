package com.flourmillapi.APIs.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class homeController {
    @RequestMapping("/")
    public String demo(){
        return "Aihi Hoga na run!";
    }

}
