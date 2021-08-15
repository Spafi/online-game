package com.spaf.coderush.game.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GameRound {
    private String gameId;
    private List<Player> players;
    private String script;
    private String language;
    private String byUser;
    private List<String> answers;
    private Short timeLimit;
    private RoundStatus roundStatus;
    private Player winner;
    private byte roundNumber;
}
