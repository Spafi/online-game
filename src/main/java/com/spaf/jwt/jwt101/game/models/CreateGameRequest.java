package com.spaf.jwt.jwt101.game.models;

import lombok.Data;

import java.util.List;

@Data
public class CreateGameRequest {
    private String username;
    private List<String> languages;
    private byte rounds;
    private String password;
    private int roundTimeLimit;
}
