package com.spaf.jwt.jwt101.game.models;
import lombok.Data;

import java.util.UUID;

@Data
public class ConnectRequest {
    private Player player;
    private UUID gameId;
}