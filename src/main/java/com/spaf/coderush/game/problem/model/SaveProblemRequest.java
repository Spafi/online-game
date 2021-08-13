package com.spaf.coderush.game.problem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveProblemRequest {

    private String username;
    private Problem problem;
    private List<String> answers;
}
