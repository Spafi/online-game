package com.spaf.jwt.jwt101;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(allowedHeaders = "*")
public class HelloResource {

    @GetMapping(value = "/hello")
    public String hello() {
        return "Hello over there";
    }

}
