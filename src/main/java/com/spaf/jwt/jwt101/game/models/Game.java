package com.spaf.jwt.jwt101.game.models;

import com.spaf.jwt.jwt101.game.languages.Language;
import com.spaf.jwt.jwt101.game.problem.model.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {
    private UUID gameId;
    private Player player1;
    private Player player2;
    private GameStatus gameStatus;
    private List<Problem> problems;
    private Boolean isPrivate;
    private String password;
    private byte rounds;
}
