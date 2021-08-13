package com.spaf.coderush.user.service;


import com.spaf.coderush.registration.token.ConfirmationToken;
import com.spaf.coderush.registration.token.ConfirmationTokenService;
import com.spaf.coderush.user.model.AppUser;
import com.spaf.coderush.user.model.PlayerData;
import com.spaf.coderush.user.repository.AppUserRepository;
import com.spaf.coderush.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppUserService implements UserDetailsService {

    private static final String USERNAME_NOT_FOUND_MESSAGE = "User with email %s not found!";
    private static final String EMAIL_TAKEN_MESSAGE = "Email already taken";
    private static final String USERNAME_TAKEN_MESSAGE = "Username already taken";
    private static final String USER_NOT_FOUND_MESSAGE = "User not found";

    private final AppUserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Value("${CONFIRMATION_TOKEN_EXPIRY_TIME}")
    private int CONFIRMATION_TOKEN_EXPIRY_TIME;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(USERNAME_NOT_FOUND_MESSAGE, email)));
    }

    public String signUpUser(AppUser user) throws IllegalStateException {
        boolean userExists = userRepository
                .findByEmail(user.getEmail())
                .isPresent();
        if (userExists) throw new IllegalStateException(EMAIL_TAKEN_MESSAGE);

// TODO: if email not confirmed, send confirmation email, or resend confirmation email if same user that registered

        boolean usernameTaken = userRepository
                .findByUsername(user.getChosenUsername())
                .isPresent();

        if (usernameTaken) throw new IllegalStateException(USERNAME_TAKEN_MESSAGE);

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(CONFIRMATION_TOKEN_EXPIRY_TIME),
                user
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public AppUser findByUsername(String username) throws UserNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(()-> new UserNotFoundException(USER_NOT_FOUND_MESSAGE));
    }

    public void updateUserData(AppUser user) {
        userRepository.save(user);
    }
    public void enableAppUser(String email) {
        userRepository.enableAppUser(email);
    }


//TODO: Update Leaderboard function

    public List<PlayerData> getLeaderboard(Integer pageNo, Integer pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy).descending());
        Page<AppUser> pagedResult = userRepository.findAll(paging);
        List<PlayerData> convertedResults = new ArrayList<>();
        if (pagedResult.hasContent()) {
            pagedResult.forEach(user -> {
                PlayerData playerData = PlayerData
                        .builder()
                        .username(user.getChosenUsername())
                        .score(user.getScore())
                        .gamesPlayed(user.getGamesPlayed())
                        .build();
                convertedResults.add(playerData);
            });
        }
        return convertedResults;
    }
}
