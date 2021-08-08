package com.spaf.jwt.jwt101.game.models;
import lombok.Data;


@Data
public class ConnectRequest {
    private Player player;
    private String gameId;
    private String password;
}