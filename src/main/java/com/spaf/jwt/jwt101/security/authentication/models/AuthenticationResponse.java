package com.spaf.jwt.jwt101.security.authentication.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticationResponse {
    private final String jwt;
    private final String role;
}
