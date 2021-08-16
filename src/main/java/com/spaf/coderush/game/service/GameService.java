package com.spaf.coderush.game.service;

import com.spaf.coderush.game.exception.GameNotFoundException;
import com.spaf.coderush.game.model.*;
import com.spaf.coderush.user.model.AppUser;
import com.spaf.coderush.game.exception.InvalidGameException;
import com.spaf.coderush.game.exception.InvalidParamException;
import com.spaf.coderush.game.problem.model.Problem;
import com.spaf.coderush.game.repository.GameStorage;
import com.spaf.coderush.game.problem.service.ProblemService;
import com.spaf.coderush.user.exception.UserNotFoundException;
import com.spaf.coderush.user.service.AppUserService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;


@Service
@AllArgsConstructor
public class GameService {

    private final AppUserService userService;
    private final ProblemService problemService;

    public GameRound createGame(CreateGameRequest createGameRequest)
            throws UserNotFoundException {

        Game game = new Game();
        final byte SHORT_ID_LENGTH = 6;

        game.setGameId(RandomStringUtils.randomAlphanumeric(SHORT_ID_LENGTH));

        String username = createGameRequest.getUsername();
        AppUser user = userService.findByUsername(username);
        Player player1 = new Player(user.getChosenUsername());

        game.getPlayers().add(player1);
        game.setGameStatus(GameStatus.NEW);

        short roundTimeLimit = createGameRequest.getRoundTimeLimit();
        game.setRoundTimeLimit(roundTimeLimit);

        List<String> languages = createGameRequest.getLanguages();
        byte rounds = createGameRequest.getRounds();
        List<Problem> problemsList = problemService.findByLanguagesWithCount(languages, rounds);

        game.setProblems(problemsList);
        problemsList.forEach(problem -> Collections.shuffle(problem.getAnswers()));
        game.setRound((byte) (problemsList.size() - 1));
        // round 2
        GameStorage.getInstance().setGame(game);

        String password = createGameRequest.getPassword();

        if (password != null && !password.equals(""))
            game.setPassword(password);

        return GameRound
                .builder()
                .gameId(game.getGameId())
                .players(game.getPlayers())
                .build();
    }

    public GameRound connectToGame(ConnectRequest connectRequest)
            throws InvalidParamException, InvalidGameException, UserNotFoundException {

        String gameId = connectRequest.getGameId();
        if (!GameStorage.getInstance().getGames().containsKey(gameId))
            throw new InvalidParamException("Game not found with ID: " + gameId);

        Game game = GameStorage.getInstance().getGames().get(gameId);
        String password = game.getPassword();

        if (password != null && !password.equals(""))
            if (!connectRequest.getPassword().equals(password))
                throw new InvalidParamException("Wrong Password!");

        byte maxPlayers = game.getMaxPlayers();
        if (game.getPlayers().size() >= maxPlayers)
            throw new InvalidGameException(
                    String.format("The maximum number of players (%d) has been reached!", maxPlayers)
            );

        Player player = new Player(
                userService.findByUsername(connectRequest.getPlayer().getUsername())
                        .getChosenUsername()
        );

        if (!game.getPlayers().contains(player))
            game.getPlayers().add(player);

        return GameRound
                .builder()
                .gameId(game.getGameId())
                .players(game.getPlayers())
                .roundStatus(RoundStatus.CONNECTED)
                .build();
    }

    public Game connectToRandomGame(AppUser player2) {
        return null;
    }

    public GameRound startGame(StartGameRequest request) throws InvalidParamException {

        String gameId = request.getGameId();

        if (!GameStorage.getInstance().getGames().containsKey(gameId))
            throw new InvalidParamException("Game not found with ID: " + gameId);

        Game game = GameStorage.getInstance().getGames().get(gameId);
        Problem problem = game.getProblems().get(game.getRound());

        return GameRound
                .builder()
                .gameId(game.getGameId())
                .players(game.getPlayers())
                .script(problem.getScript())
                .language(problem.getLanguage())
                .byUser(problem.getByUser())
                .answers(problem.getAnswers())
                .timeLimit((short) 3)
                .roundStatus(RoundStatus.START_GAME)
                .build();
    }

    public GameRound gamePlay(GamePlay gamePlay)
            throws InvalidGameException, UserNotFoundException, GameNotFoundException {

        if (!GameStorage.getInstance().getGames().containsKey(gamePlay.getGameId())) {
            throw new GameNotFoundException("Game not found");
        }

        Game game = GameStorage.getInstance().getGames().get(gamePlay.getGameId());

        if (game.getGameStatus().equals(GameStatus.FINISHED)) {
            throw new InvalidGameException("Game is already finished");
        }

        List<Problem> gameProblems = game.getProblems();
        byte currentRound = game.getRound();
//        round 2

        GameRound gameRound = GameRound
                .builder()
                .gameId(game.getGameId())
                .timeLimit((short) 3)
                .roundStatus(RoundStatus.FINISHED)
                .build();

        Problem answeredProblem = gameProblems.get(currentRound);
        Problem problemFromDb = problemService.findById(answeredProblem.getId());

        if (gamePlay.getAnswer().equals(answeredProblem.getOutput())) {
            Player player = game.getPlayerByUsername(gamePlay.getUsername());
            player.setScore((player.getScore() + 1));
            gameRound.setWinner(player);
            problemFromDb.setCorrectAnswered(problemFromDb.getCorrectAnswered() + 1);
        }
        problemFromDb.setPlayedCount(problemFromDb.getPlayedCount() + 1);
        problemService.save(problemFromDb);


        try {
            Problem nextProblem = game.getProblems().get(currentRound - 1);
            gameRound.setScript(nextProblem.getScript());
            gameRound.setAnswers(nextProblem.getAnswers());
            gameRound.setLanguage(nextProblem.getLanguage());
            gameRound.setByUser(nextProblem.getByUser());
        } catch (IndexOutOfBoundsException e) {
            gameRound.setRoundStatus(RoundStatus.GAME_FINISH);

            Player winner = game.getPlayers()
                    .stream()
                    .max(Comparator.comparing(Player::getScore))
                    .get();

            if (winner.getScore() > 0) game.setWinner(winner);
        }

        gameRound.setPlayers(game.getPlayers());
        game.setRound((byte) (currentRound - 1));

        return gameRound;
    }
}
