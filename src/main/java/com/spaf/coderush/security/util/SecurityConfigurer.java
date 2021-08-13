package com.spaf.coderush.security.util;


import com.spaf.coderush.user.service.AppUserService;
import com.spaf.coderush.security.filters.JwtRequestFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

    private final AppUserService appUserService;

    private final JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeRequests().antMatchers("/api/v*/authenticate/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/", "/styles/error.css").permitAll()
                .antMatchers("/api/v*/registration/**").permitAll()
                .antMatchers("/hello").authenticated()
                .antMatchers("/ws*/**").permitAll()
                .anyRequest().permitAll()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public RestTemplate restTemplateBean() {
        return new RestTemplate();
    }

}
