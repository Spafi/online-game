package com.spaf.coderush.game.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GameNotFoundException extends Exception {

    private String message;
}
