package com.spaf.jwt.jwt101.game.problem.repository;

import com.spaf.jwt.jwt101.game.problem.model.Problem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, UUID>, PagingAndSortingRepository<Problem, UUID> {


    List<Problem> findByLanguageIn(List<String> languages);

    List<Problem> findByByUser(String byUser);
}
