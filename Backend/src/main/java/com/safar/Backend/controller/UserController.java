package com.safar.Backend.controller;
import com.safar.Backend.constant.SafarConstant;
import com.safar.Backend.model.User;
import com.safar.Backend.payload.LoginDto;
import com.safar.Backend.repository.RolesRepository;
import com.safar.Backend.repository.UserRepository;
import com.safar.Backend.security.SafarSecurityAuthenticationProvider;
import com.safar.Backend.service.UserService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;


import jakarta.validation.Valid;

@Slf4j
@RestController
@RequestMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins="*")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private SafarSecurityAuthenticationProvider safarSecurityAuthenticationProvider;


    @PostMapping("/register")
    public ResponseEntity<?> register( @Valid @RequestBody User user, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        else{
            user = userService.createNewUser(user);
        }
        log.info(user.toString());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }




        @PostMapping("/login")
        public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto,HttpServletRequest request) {
            try{
            String mobileNum = loginDto.getMobileNum();

            String pswd = loginDto.getPswd();

                UsernamePasswordAuthenticationToken authReq =
                        new UsernamePasswordAuthenticationToken(mobileNum, pswd);
                Authentication auth = safarSecurityAuthenticationProvider.authenticate(authReq);

            SecurityContextHolder.getContext().setAuthentication(auth);
                HttpSession session = request.getSession(true);
                session.setAttribute("user", mobileNum);

            return ResponseEntity.ok("User logged in successfully" +session.getAttribute("user"));
        }catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }}

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
    try{
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
                SecurityContextHolder.clearContext();


            return ResponseEntity.ok("User logged out successfully");
        }catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    }




    /*@GetMapping("/apple")
    public ResponseEntity<String> apple() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            log.info("User is authenticated: {}", auth.isAuthenticated());
            return ResponseEntity.ok(auth.getName());
        } else {
            log.info("User is not authenticated");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
        }
    }*/
        }






