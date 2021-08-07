package com.spaf.jwt.jwt101.game.models;

import lombok.Data;

import java.util.UUID;

@Data
public class GamePlay {
    private UUID gameId;
    private String username;
    private String answer;

}
