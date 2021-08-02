package com.spaf.jwt.jwt101.game.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class InvalidParamException extends Exception {

    private  String message;
}
