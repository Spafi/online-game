package com.spaf.coderush.user.model;

import com.spaf.coderush.game.language.Language;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public @Data
class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type = "pg-uuid")
    private UUID id;

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private int score;
    private int gamesPlayed;


    @OneToMany
    private List<Language> languages;

    @Enumerated(EnumType.STRING)
    private AppUserRole role;

    private Boolean enabled = false;
    private Boolean locked = false;

    public AppUser(
            String firstName,
            String lastName,
            String username,
            String email,
            String password,
            AppUserRole role
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.score = 0;
        this.gamesPlayed = 0;
    }

    public AppUser(String username, String email, String password, AppUserRole role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getChosenUsername() {
        return username;
    }

    //    TODO: expiration check
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
