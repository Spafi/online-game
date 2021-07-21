package com.spaf.jwt.jwt101.security.registration.controller;

import com.spaf.jwt.jwt101.security.registration.models.RegistrationRequest;
import com.spaf.jwt.jwt101.security.registration.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
@CrossOrigin
public class RegistrationController {

    @Autowired
    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        try {
            return registrationService.register(request);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered!", e);
        }

    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
