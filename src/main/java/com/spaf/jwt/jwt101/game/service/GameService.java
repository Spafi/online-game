package com.spaf.jwt.jwt101.game.service;

import com.spaf.jwt.jwt101.game.exception.InvalidGameException;
import com.spaf.jwt.jwt101.game.exception.InvalidParamException;
import com.spaf.jwt.jwt101.game.models.Game;
import com.spaf.jwt.jwt101.game.models.GameStatus;
import com.spaf.jwt.jwt101.game.repository.GameStorage;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.services.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class GameService {

    @Autowired
    private AppUserService userService;

    public Game createGame(String playerId) {
        AppUser player1 = userService.findById(UUID.fromString(playerId));
        Game game = new Game();
        game.setGameId(UUID.randomUUID());
        game.setPlayer1(player1);
        game.setGameStatus(GameStatus.NEW);
//        TODO: Add problems to game
        game.setProblems(null);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game connectToGame(AppUser player2, UUID gameId) throws InvalidParamException, InvalidGameException {
        if (!GameStorage.getInstance().getGames().containsKey(gameId)) {
            throw new InvalidParamException("Game not found with ID: " + gameId);
        }

        Game game = GameStorage.getInstance().getGames().get(gameId);

        if (game.getPlayer2() != null) {
            throw new InvalidGameException("Game is not valid anymore");
        }

        game.setPlayer2(player2);
        game.setGameStatus(GameStatus.IN_PROGRESS);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game connectToRandomGame(AppUser player2) {
        return null;
    }

    public Game gamePlay() {
        return null;
    }
}
