package com.spaf.jwt.jwt101.game.controller;

import com.spaf.jwt.jwt101.game.models.Game;
import com.spaf.jwt.jwt101.game.service.GameService;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.UUID;

@CrossOrigin
@Controller
public class GameController {

    @Autowired
    GameService gameService;

    @Autowired
    AppUserService userService;


}
