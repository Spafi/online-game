package com.spaf.coderush.game.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GameRound {
    private String gameId;
    private Player player1;
    private Player player2;
    private String script;
    private String language;
    private String byUser;
    private List<String> answers;
    private int timeLimit;
    private RoundStatus roundStatus;
}
