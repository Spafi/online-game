package com.spaf.jwt.jwt101.user.services;


import com.spaf.jwt.jwt101.registration.token.ConfirmationToken;
import com.spaf.jwt.jwt101.registration.token.ConfirmationTokenService;
import com.spaf.jwt.jwt101.user.models.AppUser;
import com.spaf.jwt.jwt101.user.models.PlayerData;
import com.spaf.jwt.jwt101.user.repository.AppUserRepository;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private static final String USERNAME_NOT_FOUND_MESSAGE = "User with email %s not found!";

    private final AppUserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USERNAME_NOT_FOUND_MESSAGE, email)));
    }

    public String signUpUser(AppUser user) throws IllegalStateException {
        boolean userExists = userRepository
                .findByEmail(user.getEmail())
                .isPresent();

        if (userExists) throw new IllegalStateException("Email already taken");
//        TODO: if email not confirmed, send confirmation email, or resend confirmation email if same user that registered

        boolean usernameTaken = userRepository
                .findByUsername(user.getChosenUsername())
                .isPresent();

        if (usernameTaken) throw new IllegalStateException("Username already taken");

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user

        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);

//        TODO: Send email

        return token;
    }

    //    TODO: ADD Null check
    public AppUser findById(UUID userId) {
        return userRepository.findById(userId).get();
    }

    public AppUser findByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    public void updateUserData(AppUser user) {
        userRepository.save(user);
    }

    public int enableAppUser(String email) {
        return userRepository.enableAppUser(email);
    }

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
