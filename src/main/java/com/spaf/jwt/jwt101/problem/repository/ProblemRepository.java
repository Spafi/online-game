package com.spaf.jwt.jwt101.problem.repository;

import com.spaf.jwt.jwt101.problem.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, UUID> {

}
