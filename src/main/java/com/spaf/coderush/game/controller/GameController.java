package com.spaf.coderush.game.controller;

import com.spaf.coderush.game.model.*;
import com.spaf.coderush.game.exception.InvalidGameException;
import com.spaf.coderush.game.exception.InvalidParamException;
import com.spaf.coderush.game.service.GameService;
import com.spaf.coderush.user.exception.UserNotFoundException;
import com.spaf.coderush.user.model.AppUser;
import javassist.NotFoundException;
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

    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/start")
    public ResponseEntity<GameRound> start(@RequestBody CreateGameRequest createGameRequest) throws UserNotFoundException {
        log.info("start game request: {}", createGameRequest);
        return ResponseEntity.ok(gameService.createGame(createGameRequest));
    }

    @PostMapping("/connect")
    public ResponseEntity<GameRound> connect(@RequestBody ConnectRequest request) throws InvalidParamException, InvalidGameException, UserNotFoundException {
        log.info("connect request: {}", request);

        GameRound waitingRound = gameService.connectToGame(request);
        Timer timer = new Timer();

        TimerTask task = new TimerTask() {
            int timeRemaining = 3;
            @Override
            public void run() {
                waitingRound.setTimeLimit(timeRemaining);
                if (timeRemaining == 0) {
                    cancel();
                    waitingRound.setRoundStatus(RoundStatus.START_GAME);
                }
                simpMessagingTemplate.convertAndSend("/topic/game-progress/" + request.getGameId(), waitingRound);
                timeRemaining -= 1;
            }
        };

        timer.scheduleAtFixedRate(task, new Date(), 1000);

        return ResponseEntity.ok(waitingRound);
    }

    @PostMapping("/connect/random")
    public ResponseEntity<Game> connectRandom(@RequestBody AppUser player) {
        log.info("connect random {}", player);
        return ResponseEntity.ok(gameService.connectToRandomGame(player));
    }

    @PostMapping("/gameplay")
    public ResponseEntity<GameRound> gamePlay(@RequestBody GamePlay request) throws NotFoundException, InvalidGameException, UserNotFoundException {
        log.info("gameplay: {}", request);
        GameRound gameRound = gameService.gamePlay(request);
        simpMessagingTemplate.convertAndSend("/topic/game-progress/" + request.getGameId(), gameRound);
        RoundStatus roundStatus = gameRound.getRoundStatus();

        if (roundStatus.equals(RoundStatus.NEW)) gameRound.setRoundStatus(RoundStatus.IN_PROGRESS);
        if (roundStatus.equals(RoundStatus.FINISHED)) gameRound.setRoundStatus(RoundStatus.NEW);

        simpMessagingTemplate.convertAndSend("/topic/game-progress/" + request.getGameId(), gameRound);


//        Timer timer = new Timer();
//
//        timer.scheduleAtFixedRate(new TimerTask() {
//            int roundTimeLimit = gameRound.getTimeLimit();
//
//            @SneakyThrows
//            @Override
//            public void run() {
//                gameRound.setTimeLimit(roundTimeLimit);
//
//                if (gameRound.getRoundStatus().equals("NEW")) gameRound.setRoundStatus("IN_PROGRESS");
//                if (gameRound.getRoundStatus().equals("FINISHED") || roundTimeLimit <= 0) {
//                    gameRound.setRoundStatus("NEW");
//
//                    cancel();
//                }
//                simpMessagingTemplate.convertAndSend("/topic/game-progress/" + request.getGameId(), gameRound);
//                roundTimeLimit -= 1;
//            }
//        }, 0, 1000);

        return ResponseEntity.ok(gameRound);
    }
}