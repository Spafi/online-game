package com.spaf.jwt.jwt101.game.models;

import com.spaf.jwt.jwt101.game.problem.model.Problem;
import lombok.*;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;

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
    private Boolean isPrivate;
    private String password;
    private byte rounds;
}
