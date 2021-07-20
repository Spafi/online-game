package com.spaf.jwt.jwt101.security.registration.email;

public interface EmailSender {
    void send(String to, String email);
}