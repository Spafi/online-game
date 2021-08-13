package com.spaf.coderush.game.model;

import com.spaf.coderush.game.problem.model.Problem;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    private String gameId;
    private Player player1;
    private Player player2;
    private GameStatus gameStatus;
    private List<Problem> problems;
    private String password;
    private int round;
    private int roundTimeLimit;

    public Player getPlayerByUsername(String username) {
        Player player = null;
        if (getPlayer1().getUsername().equals(username)) player = getPlayer1();
        else if (getPlayer2().getUsername().equals(username)) player = getPlayer2();
        return player;
    }
}
