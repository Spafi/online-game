package com.spaf.jwt.jwt101.game.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GamePlay {
    private String gameId;
    private String username;
    private String answer;
    private int round;

    public GamePlay(String gameId) {
        this.gameId = gameId;
    }
}
