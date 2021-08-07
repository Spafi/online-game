package com.spaf.jwt.jwt101.game.problem.service;

import com.spaf.jwt.jwt101.game.problem.model.Problem;
import com.spaf.jwt.jwt101.game.problem.repository.ProblemRepository;
import com.spaf.jwt.jwt101.user.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProblemService {

    @Autowired
    private AppUserService userService;

    @Autowired
    private ProblemRepository problemRepository;

    public Problem save(Problem problem) {
        return problemRepository.save(problem);
    }

    public Problem findById(UUID id) {
//        TODO: Null check
        return problemRepository.findById(id).get();
    }

    public List<Problem> findByLanguages(List<String> languages) {
        return problemRepository.findByLanguageIn(languages);
    }
}
