package com.spaf.coderush.game.controller;

import com.spaf.coderush.game.exception.GameNotFoundException;
import com.spaf.coderush.game.model.*;
import com.spaf.coderush.game.exception.InvalidGameException;
import com.spaf.coderush.game.exception.InvalidParamException;
import com.spaf.coderush.game.repository.GameStorage;
import com.spaf.coderush.game.service.GameService;
import com.spaf.coderush.user.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;


@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/game")
public class GameController {

    private final static String gameProgressURL = "/topic/game-progress/";
    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/create")
    public ResponseEntity<GameRound> create(@RequestBody CreateGameRequest createGameRequest)
            throws UserNotFoundException {
        log.info("create game request: {}", createGameRequest);
        return ResponseEntity.ok(gameService.createGame(createGameRequest));
    }

    @PostMapping("/connect")
    public ResponseEntity<GameRound> connect(@RequestBody ConnectRequest request)
            throws InvalidParamException, InvalidGameException, UserNotFoundException {
        log.info("connect request: {}", request);
        GameRound waitingRound = gameService.connectToGame(request);
        simpMessagingTemplate.convertAndSend(
                gameProgressURL + request.getGameId(), waitingRound
        );
        return ResponseEntity.ok(waitingRound);
    }

    @PostMapping("/start")
    public ResponseEntity<GameRound> start(@RequestBody StartGameRequest startGameRequest)
            throws InvalidParamException {
        log.info("start game request: {}", startGameRequest);
        GameRound startGame = gameService.startGame(startGameRequest);

        Timer timer = new Timer();
        TimerTask task = new TimerTask() {

            @Override
            public void run() {
                simpMessagingTemplate.convertAndSend(
                        gameProgressURL + startGameRequest.getGameId(), startGame
                );

                if (startGame.getTimeLimit() == 0) {
                    cancel();
                    startGame.setRoundStatus(RoundStatus.NEW);
                    simpMessagingTemplate.convertAndSend(
                            gameProgressURL + startGameRequest.getGameId(), startGame
                    );
                }
                startGame.setTimeLimit((short) (startGame.getTimeLimit() - 1));
            }
        };

        timer.scheduleAtFixedRate(task, new Date(), 1000);
        return ResponseEntity.ok(startGame);
    }


//    @PostMapping("/connect/random")
//    public ResponseEntity<Game> connectRandom(@RequestBody AppUser player) {
//        log.info("connect random {}", player);
//        return ResponseEntity.ok(gameService.connectToRandomGame(player));
//    }
//
    @PostMapping("/gameplay")
    public ResponseEntity<GameRound> gamePlay(@RequestBody GamePlay request)
            throws GameNotFoundException, InvalidGameException, UserNotFoundException {
        log.info("gameplay: {}", request);
        Game game = GameStorage.getInstance().getGames().get(request.getGameId());
        GameRound gameRound = gameService.gamePlay(request);

        simpMessagingTemplate.convertAndSend(gameProgressURL + request.getGameId(), gameRound);

        RoundStatus roundStatus = gameRound.getRoundStatus();

        if (roundStatus.equals(RoundStatus.FINISHED)) {

            Timer timer = new Timer();
            TimerTask task = new TimerTask() {

                @Override
                public void run() {
                    simpMessagingTemplate.convertAndSend(
                            gameProgressURL + request.getGameId(), gameRound
                    );

                    if (gameRound.getTimeLimit() == 0) {
                        cancel();
                        gameRound.setTimeLimit(game.getRoundTimeLimit());
                        gameRound.setRoundStatus(RoundStatus.NEW);
                        simpMessagingTemplate.convertAndSend(
                                gameProgressURL + request.getGameId(), gameRound
                        );
                    }
                    gameRound.setTimeLimit((short) (gameRound.getTimeLimit() - 1));
                }
            };

            timer.scheduleAtFixedRate(task, new Date(), 1000);
        }
        return ResponseEntity.ok(gameRound);
    }
}