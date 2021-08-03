package com.spaf.jwt.jwt101.problem.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spaf.jwt.jwt101.problem.model.Problem;
import com.spaf.jwt.jwt101.problem.model.SaveProblemRequest;
import com.spaf.jwt.jwt101.problem.service.ProblemService;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.services.AppUserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/problem")
@CrossOrigin
@AllArgsConstructor
@NoArgsConstructor
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @Autowired
    private AppUserService userService;

    @Autowired
    RestTemplate restTemplate;

    @Value("${JDOODLE_CLIENT_ID}")
    String clientId;

    @Value("${JDOODLE_CLIENT_SECRET}")
    String clientSecret;

    @Value("${API_COMPILER_URL}")
    String apiCompilerUrl;

    @PostMapping(value = "/run", produces = "application/json")
    public String runScript(@RequestBody Problem problem) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        problem.setClientId(clientId);
        problem.setClientSecret(clientSecret);

        HttpEntity<Problem> entity = new HttpEntity<>(problem, headers);

        return restTemplate.exchange(
                apiCompilerUrl, HttpMethod.POST, entity, String.class).getBody();
    }

    @PostMapping
    public ResponseEntity<?> saveProblem(@RequestBody SaveProblemRequest saveProblemRequest) throws JsonProcessingException {

        Problem problem = saveProblemRequest.getProblem();
        AppUser user = userService.findByUsername(saveProblemRequest.getUsername());
        List<String> answers = saveProblemRequest.getAnswers();
        String response = runScript(problem);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);
        String output = root.path("output").textValue();

        problem.setOutput(output);
        problem.setByUser(user.getUsername());
        problem.setAnswers(answers);
        problem.getAnswers().add(output);
        Problem savedProblem = problemService.save(problem);

        return ResponseEntity.ok(savedProblem.getId());
    }
}

