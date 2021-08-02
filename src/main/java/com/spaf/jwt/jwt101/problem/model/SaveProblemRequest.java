package com.spaf.jwt.jwt101.problem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveProblemRequest {

    private Problem problem;
    private List<String> answers;
}
