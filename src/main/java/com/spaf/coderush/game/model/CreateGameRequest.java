package com.spaf.coderush.game.model;

import lombok.Data;

import java.util.List;

@Data
public class CreateGameRequest {
    private String username;
    private List<String> languages;
    private byte rounds;
    private String password;
    private short roundTimeLimit;
}
