package com.safar.Backend.controller;

import com.safar.Backend.model.Driver;
import com.safar.Backend.model.User;
import com.safar.Backend.payload.ApiResponse;
import com.safar.Backend.payload.LoginDto;
import com.safar.Backend.repository.DriverRepository;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@Slf4j

@RestController
@RequestMapping(produces = {MediaType.APPLICATION_JSON_VALUE})

public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private SafarSecurityAuthenticationProvider safarSecurityAuthenticationProvider;
    @Autowired
    private HttpServletRequest httpServletRequest;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, Errors errors,HttpServletRequest request) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        try {
            user = userService.createNewUser(user);
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.getUserId());


            if (user.getUserType().equalsIgnoreCase("Driver")) {
                Driver driver = new Driver();
                driver.setUser(user);
                driverRepository.save(driver);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto, HttpServletRequest request) {
        String userName = loginDto.getUserName();
        String pswd = loginDto.getPswd();

        UsernamePasswordAuthenticationToken authReq = new UsernamePasswordAuthenticationToken(userName, pswd);
        try {
            Authentication auth = safarSecurityAuthenticationProvider.authenticate(authReq);
            SecurityContextHolder.getContext().setAuthentication(auth);

            HttpSession session = request.getSession(true);
            if (auth != null && auth.getPrincipal() instanceof User) {
                User user = (User) auth.getPrincipal();
                session.setAttribute("userId", user.getUserId());
                log.info("User logged in: " + user.toString());
                log.info("Session ID: " + session.getAttribute("userId").toString());
            }
            return ResponseEntity.ok(new ApiResponse(true, "User logged in successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "Invalid credentials"));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null) {
                new SecurityContextLogoutHandler().logout(request, response, auth);
            }
            SecurityContextHolder.clearContext();
            request.getSession().invalidate();
            request.getSession().removeAttribute("userId");
            return ResponseEntity.ok("User logged out successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "User not logged in"));
        }
        return ResponseEntity.ok(userRepository.findById(userId));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }


    @PutMapping("/updateuser")
    public ResponseEntity<?> updateUser(HttpServletRequest request, @RequestBody User updatedUser, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new IllegalArgumentException("No active session found");
        }
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("No userId found in session");
        }
       User user = userRepository.findByUserId(userId);

        if (updatedUser.getUserName() != null) {
            user.setUserName(updatedUser.getUserName());
        }
        if (updatedUser.getMobileNum() != null) {
            user.setMobileNum(updatedUser.getMobileNum());
        }
        if (updatedUser.getPswd() != null) {
            user.setPswd(passwordEncoder.encode(updatedUser.getPswd()));
        }
        if (updatedUser.getUserType() != null) {
            user.setUserType(updatedUser.getUserType());
        }
        if (updatedUser.getProfileImg() != null) {
            user.setProfileImg(updatedUser.getProfileImg());
        }

        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse(true, "User updated successfully"));


    }

    @DeleteMapping("/deleteuser")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "User not logged in"));
        }

        User existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "User not found"));
        }

        userRepository.delete(existingUser);
        return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
    }


}
