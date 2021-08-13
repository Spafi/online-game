package com.spaf.coderush.game.model;
import lombok.Data;


@Data
public class ConnectRequest {
    private Player player;
    private String gameId;
    private String password;
}