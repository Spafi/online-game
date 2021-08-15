package com.spaf.coderush.game.model;

import com.spaf.coderush.game.problem.model.Problem;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    private String gameId;
    private List<Player> players = new ArrayList<>();
    private GameStatus gameStatus;
    private List<Problem> problems = new ArrayList<>();
    private String password;
    private byte round;
    private short roundTimeLimit;
    private byte maxPlayers = 5;

    public Player getPlayerByUsername(String username) {
        Player player = null;
        for (Player p : players) {
            if (p.getUsername().equals(username)) player = p;
        }
        return player;
    }
}
