package com.spaf.coderush.game.problem.service;

import com.spaf.coderush.user.service.AppUserService;
import com.spaf.coderush.game.problem.model.Problem;
import com.spaf.coderush.game.problem.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public List<Problem> findByLanguages(List<String> languages, int count) {
//        TODO: Change random retrieving method for large scale application, or, better, optimize database
        List<Problem> problemsByLanguages = problemRepository.findByLanguageIn(languages);
        if(problemsByLanguages.size() < count) throw new ArrayIndexOutOfBoundsException("Not enough problems");
        return getRandomProblems(problemsByLanguages, count);

    }

    List<Problem> getRandomProblems(List<Problem> problems, int count) {

        List<Problem> randomProblems = new ArrayList<>();

        final int[] randomIndexes = new Random()
                .ints(1, problems.size())
                .distinct()
                .limit(count)
                .toArray();

        for (int i : randomIndexes) {
            randomProblems.add(problems.get(i));
        }
        return randomProblems;
    }

    public List<Problem> findByUsername(String username) {
        return problemRepository.findByByUser(username);
    }

//    private List<Problem> getRandomProblems(List<Problem> problems, int count)
//TODO: FOR FUTURE USE
//    public List<Problem> randomProblems(int count) {
//        long quantity = problemRepository.count();
//        int index = (int) (Math.random() * quantity);
//        Page<Problem> problemPage = problemRepository.findAll(PageRequest.of(index, 1));
//        List<Problem> problemList = new ArrayList<>();
//        if (problemPage.hasContent()) {
//            problemList = new ArrayList<>(problemPage.getContent());
//        }
//        return problemList;
//    }
}
