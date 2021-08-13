package com.spaf.coderush.user.model;

import com.spaf.coderush.game.language.Language;
import com.spaf.coderush.game.problem.model.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerData {

    private String username;
    private int score;
    private int gamesPlayed;
    private List<Problem> submittedProblems;
    private List<Language> languages;
}
