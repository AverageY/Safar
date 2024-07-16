package com.safar.Backend.config;

import com.safar.Backend.security.SafarSecurityAuthenticationProvider;
import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class ProjectSecurityConfig {
@Autowired



    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity httpSecurity, AuthenticationConfiguration authenticationConfiguration) throws Exception {

                httpSecurity
                        .cors(c->c.configurationSource(corsConfigurationSource()))
                        .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/register", "/login", "/*").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/driver/**").hasAnyRole("BASE", "ADMIN")
                        .requestMatchers("/trip/**").hasAnyRole("BASE", "ADMIN")
                        .anyRequest().permitAll()
                )
                .sessionManagement(sessionManagementConfigurer ->
                        sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .logout(logoutConfigurer ->
                        logoutConfigurer
                                .logoutSuccessUrl("/logout?logout=true")

                                .logoutSuccessHandler((request, response, authentication) -> {
                                    response.setStatus(HttpServletResponse.SC_OK);
                                })
                                .invalidateHttpSession(true)

                                .permitAll()
                )
                .httpBasic(withDefaults());


        return httpSecurity.build();
    }

   @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Adjust as needed
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;}






    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
