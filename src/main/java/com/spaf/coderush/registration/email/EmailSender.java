package com.spaf.coderush.registration.email;

public interface EmailSender {
    void send(String to, String email);
}