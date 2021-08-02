package com.spaf.jwt.jwt101.game.models;

import com.spaf.jwt.jwt101.problem.model.Problem;
import com.spaf.jwt.jwt101.user.models.AppUser;
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
    private AppUser player1;
    private AppUser player2;
    private GameStatus gameStatus;
    private List<Problem> problems;
}
