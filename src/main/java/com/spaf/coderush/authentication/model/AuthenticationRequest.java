package com.spaf.coderush.authentication.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public @Data
class AuthenticationRequest {
    private String email;
    private String password;
}
