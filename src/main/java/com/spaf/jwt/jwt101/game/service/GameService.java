package com.spaf.jwt.jwt101.game.service;

import com.spaf.jwt.jwt101.game.exception.InvalidGameException;
import com.spaf.jwt.jwt101.game.exception.InvalidParamException;
import com.spaf.jwt.jwt101.game.models.*;
import com.spaf.jwt.jwt101.game.problem.model.Problem;
import com.spaf.jwt.jwt101.game.repository.GameStorage;
import com.spaf.jwt.jwt101.game.problem.service.ProblemService;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.services.AppUserService;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.spaf.jwt.jwt101.game.models.GameStatus.FINISHED;

@Service
@AllArgsConstructor
public class GameService {

    @Autowired
    private AppUserService userService;

    @Autowired
    private ProblemService problemService;

    public Game createGame(CreateGameRequest createGameRequest) {
        //        TODO: ADD check for retrieving the username
        String username = createGameRequest.getUsername();
        AppUser user = userService.findByUsername(username);
        Player player1 = new Player(user.getChosenUsername());
        List<String> languages = createGameRequest.getLanguages();
        byte rounds = createGameRequest.getRounds();

        Game game = new Game();
        game.setGameId(UUID.randomUUID());
        game.setPlayer1(player1);
        game.setGameStatus(GameStatus.NEW);
        List<Problem> problems = problemService.findByLanguages(languages);
        game.setProblems(problems);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game connectToGame(Player player2username, UUID gameId) throws InvalidParamException, InvalidGameException {
        if (!GameStorage.getInstance().getGames().containsKey(gameId)) {
            throw new InvalidParamException("Game not found with ID: " + gameId);
        }

        Game game = GameStorage.getInstance().getGames().get(gameId);

        if (game.getPlayer2() != null) {
            throw new InvalidGameException("Game is not valid anymore");
        }

//        TODO: ADD check for retrieving the username
        AppUser user2 = userService.findByUsername(player2username.getUsername());
        Player player2 = new Player(user2.getChosenUsername());

        game.setPlayer2(player2);
        game.setGameStatus(GameStatus.IN_PROGRESS);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game connectToRandomGame(AppUser player2) {
        return null;
    }

    public Game gamePlay(GamePlay gamePlay) throws NotFoundException, InvalidGameException {
        if (!GameStorage.getInstance().getGames().containsKey(gamePlay.getGameId())) {
            throw new NotFoundException("Game not found");
        }

        Game game = GameStorage.getInstance().getGames().get(gamePlay.getGameId());
        if (game.getGameStatus().equals(FINISHED)) {
            throw new InvalidGameException("Game is already finished");
        }
        return game;
    }
}
