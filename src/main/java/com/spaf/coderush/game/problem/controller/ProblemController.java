package com.spaf.coderush.game.problem.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spaf.coderush.game.problem.model.SaveProblemRequest;
import com.spaf.coderush.game.problem.model.Problem;
import com.spaf.coderush.game.problem.service.ProblemService;
import com.spaf.coderush.user.exception.UserNotFoundException;
import com.spaf.coderush.user.model.AppUser;
import com.spaf.coderush.user.service.AppUserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
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

    private ProblemService problemService;
    private AppUserService userService;
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
    public ResponseEntity<String> saveProblem(@RequestBody SaveProblemRequest saveProblemRequest)
            throws JsonProcessingException, UserNotFoundException {

        Problem problem = saveProblemRequest.getProblem();
        AppUser user = userService.findByUsername(saveProblemRequest.getUsername());
        List<String> answers = saveProblemRequest.getAnswers();
        String response = runScript(problem);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);
        String output = root.path("output").textValue();

        problem.setOutput(output);
        problem.setByUser(user.getChosenUsername());
        problem.setAnswers(answers);
        problem.getAnswers().add(output);
        problemService.save(problem);
        return ResponseEntity.ok(response);
    }
}

