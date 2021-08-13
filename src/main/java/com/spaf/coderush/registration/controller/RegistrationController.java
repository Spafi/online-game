package com.spaf.coderush.registration.controller;

import com.spaf.coderush.registration.model.RegistrationRequest;
import com.spaf.coderush.registration.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "api/v1/registration")
@RequiredArgsConstructor
@CrossOrigin
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        try {
            return registrationService.register(request);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
