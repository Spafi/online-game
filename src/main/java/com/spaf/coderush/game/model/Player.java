package com.spaf.coderush.game.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Player {

    private int score = 0;
    private String username;

    public Player(String username) {
        this.username = username;
    }
}
