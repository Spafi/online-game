package com.spaf.jwt.jwt101.user.controller;

import com.spaf.jwt.jwt101.game.models.Player;
import com.spaf.jwt.jwt101.game.problem.service.ProblemService;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.models.PlayerData;
import com.spaf.jwt.jwt101.user.services.AppUserService;
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
    public PlayerData getUserStatistics(@RequestParam String username) {
        AppUser user = userService.findByUsername(username);
        PlayerData playerData = new PlayerData();
        playerData.setScore(user.getScore());
        playerData.setGamesPlayed(user.getGamesPlayed());
        playerData.setSubmittedProblems(problemService.findByUsername(user.getChosenUsername()));
        playerData.setLanguages(user.getLanguages());
        return playerData;
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
