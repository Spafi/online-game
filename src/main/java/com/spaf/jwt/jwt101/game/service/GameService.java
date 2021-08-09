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
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;


import static com.spaf.jwt.jwt101.game.models.GameStatus.FINISHED;

@Service
@AllArgsConstructor
public class GameService {

    @Autowired
    private AppUserService userService;

    @Autowired
    private ProblemService problemService;

    public GameRound createGame(CreateGameRequest createGameRequest) {
        //        TODO: ADD check for retrieving the username
        String username = createGameRequest.getUsername();
        AppUser user = userService.findByUsername(username);
        Player player1 = new Player(user.getChosenUsername(), 0);
        List<String> languages = createGameRequest.getLanguages();
        byte rounds = createGameRequest.getRounds();

        Game game = new Game();
        final int SHORT_ID_LENGTH = 6;

        game.setGameId(RandomStringUtils.randomAlphanumeric(SHORT_ID_LENGTH));
        game.setPlayer1(player1);
        game.setGameStatus(GameStatus.NEW);
        List<Problem> problemsList = problemService.findByLanguages(languages, rounds);
        game.setProblems(problemsList);
        problemsList.forEach(problem -> Collections.shuffle(problem.getAnswers()));
        game.setRound(problemsList.size() - 1);
        GameStorage.getInstance().setGame(game);

        return GameRound
                .builder()
                .gameId(game.getGameId())
                .player1(player1)
                .build();
    }

    public GameRound connectToGame(ConnectRequest connectRequest) throws InvalidParamException, InvalidGameException {
        Player player2 = connectRequest.getPlayer();
        String gameId = connectRequest.getGameId();
        if (!GameStorage.getInstance().getGames().containsKey(gameId))
            throw new InvalidParamException("Game not found with ID: " + gameId);


        Game game = GameStorage.getInstance().getGames().get(gameId);
        if (game.getPassword() != null && !game.getPassword().equals(""))
            if (!connectRequest.getPassword().equals(game.getPassword()))
                throw new InvalidParamException("Wrong Password!");

//        int previousScore = 0;

        if (game.getPlayer2() != null) {
            if (!game.getPlayer2().equals(player2)) {
                throw new InvalidGameException("Game is not valid anymore");
            }
            //  If player 2 is reconnecting, it keeps the score
//            previousScore = game.getPlayer2().getScore();

        }
//        TODO: ADD check for retrieving the username
        AppUser user2 = userService.findByUsername(player2.getUsername());

// score previousScore
        player2 = new Player(user2.getChosenUsername(), 0);

        game.setPlayer2(player2);
        game.setGameStatus(GameStatus.IN_PROGRESS);


        return GameRound
                .builder()
                .gameId(game.getGameId())
                .player1(game.getPlayer1())
                .player2(game.getPlayer2())
                .build();
    }

    public Game connectToRandomGame(AppUser player2) {
        return null;
    }


    public GameRound gamePlay(GamePlay gamePlay) throws NotFoundException, InvalidGameException {

        if (!GameStorage.getInstance().getGames().containsKey(gamePlay.getGameId())) {
            throw new NotFoundException("Game not found");
        }

        Game game = GameStorage.getInstance().getGames().get(gamePlay.getGameId());
        List<Problem> gameProblems = game.getProblems();
        int currentRound = game.getRound();

        Player player = game.getPlayerByUsername(gamePlay.getUsername());
        /*finished game logic*/
        if (currentRound <= -1) {
            if (gamePlay.getAnswer().equals(gameProblems.get(currentRound + 1).getOutput())) {
                player.setScore((player.getScore() + 1));
            }

            return GameRound
                    .builder()
                    .gameId(game.getGameId())
                    .player1(game.getPlayer1())
                    .player2(game.getPlayer2())
                    .script("finished")
                    .build();
        }

        Problem currentProblem = gameProblems.get(currentRound);

        GameRound gameRound = GameRound
                .builder()
                .gameId(game.getGameId())
                .player1(game.getPlayer1())
                .player2(game.getPlayer2())
                .script(currentProblem.getScript())
                .answers(currentProblem.getAnswers())
                .byUser(currentProblem.getByUser())
                .build();

        if (gamePlay.getUsername() == null) {
            game.setRound(game.getRound() - 1);
            return gameRound;
        }


        if (gamePlay.getAnswer().equals(gameProblems.get(currentRound + 1).getOutput())) {
            player.setScore((player.getScore() + 1));
        }

        if (game.getGameStatus().equals(FINISHED)) {
            throw new InvalidGameException("Game is already finished");
        }
        game.setRound(--currentRound);
        return gameRound;
    }
}
