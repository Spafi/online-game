package com.spaf.jwt.jwt101.game.controller;

import com.spaf.jwt.jwt101.game.exception.InvalidGameException;
import com.spaf.jwt.jwt101.game.exception.InvalidParamException;
import com.spaf.jwt.jwt101.game.models.*;
import com.spaf.jwt.jwt101.game.service.GameService;
import com.spaf.jwt.jwt101.user.models.AppUser;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/game")
public class GameController {

    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/start")
    public ResponseEntity<GameRound> start(@RequestBody CreateGameRequest createGameRequest) {
        log.info("start game request: {}", createGameRequest);
        return ResponseEntity.ok(gameService.createGame(createGameRequest));
    }

    @PostMapping("/connect")
    public ResponseEntity<GameRound> connect(@RequestBody ConnectRequest request) throws InvalidParamException, InvalidGameException {
        log.info("connect request: {}", request);
        simpMessagingTemplate.convertAndSend("/topic/game-progress/" + request.getGameId(), request.getPlayer());
        GameRound gameRound = gameService.connectToGame(request);
        simpMessagingTemplate.convertAndSend("/topic/game-progress/" + request.getGameId(), gameRound);

        return ResponseEntity.ok(gameRound);
    }

    @PostMapping("/connect/random")
    public ResponseEntity<Game> connectRandom(@RequestBody AppUser player) {
        log.info("connect random {}", player);
        return ResponseEntity.ok(gameService.connectToRandomGame(player));
    }

    @PostMapping("/gameplay")
    public ResponseEntity<GameRound> gamePlay(@RequestBody GamePlay request) throws NotFoundException, InvalidGameException {
        log.info("gameplay: {}", request);
        GameRound gameRound = gameService.gamePlay(request);
        simpMessagingTemplate.convertAndSend("/topic/game-progress/" + gameRound.getGameId(), gameRound);
        return ResponseEntity.ok(gameRound);
    }
}