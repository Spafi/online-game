package com.spaf.coderush.game.model;

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
}
