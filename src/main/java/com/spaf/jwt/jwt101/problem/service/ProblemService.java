package com.spaf.jwt.jwt101.problem.service;

import com.spaf.jwt.jwt101.problem.model.Problem;
import com.spaf.jwt.jwt101.problem.repository.ProblemRepository;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProblemService {

    @Autowired
    private AppUserService userService;

    @Autowired
    private ProblemRepository problemRepository;

    public Problem save(Problem problem) {
        return problemRepository.save(problem);
    }
}
