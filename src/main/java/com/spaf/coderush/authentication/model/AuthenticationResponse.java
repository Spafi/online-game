package com.spaf.coderush.authentication.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticationResponse {
    private final String jwt;
    private final String role;
}
