package com.safar.Backend.controller;
import com.safar.Backend.constant.SafarConstant;
import com.safar.Backend.model.User;
import com.safar.Backend.repository.RolesRepository;
import com.safar.Backend.repository.UserRepository;
import com.safar.Backend.service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
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



}
