package com.spaf.coderush.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserNotFoundException extends Exception{
    private final String message;
}

