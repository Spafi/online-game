package com.spaf.coderush.game.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class InvalidParamException extends Exception {

    private  String message;
}
