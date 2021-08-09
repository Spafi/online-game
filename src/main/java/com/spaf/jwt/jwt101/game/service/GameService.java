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


import java.util.List;


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

        int previousScore = 0;

        if (game.getPlayer2() != null) {
            if (!game.getPlayer2().equals(player2)) {
                throw new InvalidGameException("Game is not valid anymore");
            }
            //  If player 2 is reconnecting, it keeps the score
            previousScore = game.getPlayer2().getScore();

        }
//        TODO: ADD check for retrieving the username
        AppUser user2 = userService.findByUsername(player2.getUsername());


        player2 = new Player(user2.getChosenUsername(), previousScore);

        game.setPlayer2(player2);
        game.setGameStatus(GameStatus.IN_PROGRESS);

        List<Problem> gameProblems = game.getProblems();
        int lastElement = gameProblems.size() - 1;

        return GameRound
                .builder()
                .gameId(game.getGameId())
                .player1(game.getPlayer1())
                .player2(game.getPlayer2())
                .script(gameProblems.get(lastElement).getScript())
                .answers(gameProblems.get(lastElement).getAnswers())
                .byUser(gameProblems.get(lastElement).getByUser())
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

        int currentRound = game.getProblems().size() - 1;
        if (currentRound == -1) {
            game.setGameStatus(FINISHED);
        }

        if (game.getGameStatus().equals(FINISHED)) {
            throw new InvalidGameException("Game is already finished");
        }
// TODO: UPDATE SCORE, THIS IS A MESS :))
        if (gamePlay.getAnswer().equals(game.getProblems().get(currentRound).getOutput())) {
            if (game.getPlayer1().getUsername().equals(gamePlay.getUsername())) {
                Player pl= game.getPlayer1();
                pl.setScore(game.getPlayer1().getScore() + 1);
                game.setPlayer1(pl);

            } else if (game.getPlayer2().getUsername().equals(gamePlay.getUsername())) {
                Player pl= game.getPlayer2();
                game.getPlayer2().setScore(game.getPlayer2().getScore() + 1);
                game.setPlayer2(pl);
            }
        }


        GameRound gameRound = GameRound
                .builder()
                .gameId(game.getGameId())
                .player1(game.getPlayer1())
                .player2(game.getPlayer2())
                .script(game.getProblems().get(currentRound).getScript())
                .answers(game.getProblems().get(currentRound).getAnswers())
                .byUser(game.getProblems().get(currentRound).getByUser())
                .build();


        game.getProblems().remove(currentRound);

        return gameRound;
    }
}
