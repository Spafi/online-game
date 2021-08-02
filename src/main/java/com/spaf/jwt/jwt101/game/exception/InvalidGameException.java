package com.spaf.jwt.jwt101.game.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class InvalidGameException extends Exception {

    private  String message;
}
