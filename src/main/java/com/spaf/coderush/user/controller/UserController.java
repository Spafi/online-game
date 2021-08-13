package com.spaf.coderush.user.controller;

import com.spaf.coderush.game.problem.service.ProblemService;
import com.spaf.coderush.user.exception.UserNotFoundException;
import com.spaf.coderush.user.model.AppUser;
import com.spaf.coderush.user.model.PlayerData;
import com.spaf.coderush.user.service.AppUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {

    private final AppUserService userService;
    private final ProblemService problemService;

    @GetMapping
    public ResponseEntity<PlayerData> getUserStatistics(@RequestParam String username) throws UserNotFoundException {
        AppUser user = userService.findByUsername(username);
        PlayerData playerData = new PlayerData();
        playerData.setScore(user.getScore());
        playerData.setGamesPlayed(user.getGamesPlayed());
        playerData.setSubmittedProblems(
                problemService.findByUsername(user.getChosenUsername()));
        playerData.setLanguages(user.getLanguages());
        return ResponseEntity.ok(playerData);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<PlayerData>> getLeaderboard(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "score") String sortBy) {
        List<PlayerData> players = userService.getLeaderboard(pageNo, pageSize, sortBy);
        return ResponseEntity.ok(players);
    }
}
