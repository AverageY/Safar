package com.safar.Backend.security;

import com.safar.Backend.model.User;
import com.safar.Backend.model.Roles;
import com.safar.Backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.List;

import static java.rmi.server.LogStream.log;

@Component
public class SafarSecurityAuthenticationProvider implements AuthenticationProvider {
    private static final Logger log = LoggerFactory.getLogger(SafarSecurityAuthenticationProvider.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String mobileNum = authentication.getName();

        String pswd = authentication.getCredentials().toString();
        User user = userRepository.findByMobileNum(mobileNum);
        if(null != user && user.getUserId()>0 &&
                passwordEncoder.matches(pswd,user.getPswd())){
            return new UsernamePasswordAuthenticationToken(
                    mobileNum, pswd, getGrantedAuthorities(user.getRoles()));
        }else{
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
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }


}
