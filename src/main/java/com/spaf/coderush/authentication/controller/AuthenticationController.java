package com.spaf.coderush.authentication.controller;

import com.spaf.coderush.authentication.model.AuthenticationResponse;
import com.spaf.coderush.authentication.model.AuthenticationRequest;
import com.spaf.coderush.user.model.AppUser;
import com.spaf.coderush.user.service.AppUserService;
import com.spaf.coderush.security.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AppUserService userDetailsService;
    private final JwtUtil jwtTokenUtil;

    private final static String INVALID_CREDENTIALS_MESSAGE = "Invalid credentials!";


    @PostMapping(value = "/api/v1/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, INVALID_CREDENTIALS_MESSAGE, e);
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        final String role = ((AppUser) userDetails).getRole().name();

        return ResponseEntity.ok(new AuthenticationResponse(jwt, role));
    }
}
