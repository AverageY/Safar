package com.safar.Backend.security;

import com.safar.Backend.model.User;
import com.safar.Backend.model.Roles;
import com.safar.Backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SafarSecurityAuthenticationProvider implements AuthenticationProvider {
    private static final Logger log = LoggerFactory.getLogger(SafarSecurityAuthenticationProvider.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SafarSecurityAuthenticationProvider(UserRepository userRepository,@Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String userName = authentication.getName();
        log.info("auth Authenticating user: {}", userName);
        String pswd = (String)authentication.getCredentials();
        User user = userRepository.findByUserName(userName);
        log.info("User found: {}", user != null ? "yes" : "no");
        log.info("Raw pwd chars: {}", Arrays.toString(pswd.toCharArray()));
        if(user.getPswd()!=null) {
            log.info("Stored pwd chars: {}", Arrays.toString(user.getPswd().toCharArray()));
            log.info("end: {}", passwordEncoder.encode(pswd));
        }
        if (user.getUserId() > 0 && passwordEncoder.matches(pswd, user.getPswd())) {
            log.info("end: {}", passwordEncoder.matches(pswd, user.getPswd()));
            log.info("auth Raw credentials - username: {}, password length: {}",
                    userName, pswd.length());
            log.info("Stored hash length auth: {}", user.getPswd().length());
            log.info("Password match result auth: {}",
                    passwordEncoder.matches(pswd, user.getPswd()));
            return new UsernamePasswordAuthenticationToken(
                    user, null, getGrantedAuthorities(user.getRoles()));
        } else {

            throw new BadCredentialsException("Invalid credentials!");
        }

    }

    private List<GrantedAuthority> getGrantedAuthorities(Roles roles) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + roles.getRoleName()));
        return grantedAuthorities;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }
}
