package com.spaf.coderush.game.model;

import lombok.Data;

@Data
public class StartGameRequest {
    private String gameId;
    private Player player;
}
