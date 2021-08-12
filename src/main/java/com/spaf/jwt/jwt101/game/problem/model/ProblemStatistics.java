package com.spaf.jwt.jwt101.game.problem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProblemStatistics {
    private UUID id;
    private String language;
    private String script;
    private String byUser;
    private int playedCount;

}
