package com.safar.Backend.service;

import com.safar.Backend.repository.UserRepository;
import com.safar.Backend.repository.RolesRepository;
import com.safar.Backend.model.User;
import com.safar.Backend.model.Roles;
import com.safar.Backend.constant.SafarConstant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User createNewUser(User user) {
        try {
            Roles role = rolesRepository.findByRoleName(SafarConstant.BASE_ROLE)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + SafarConstant.BASE_ROLE));

            // Assign the role to the user
            user.setRoles(role);

            user.setRoles(role);
            user.setPswd(passwordEncoder.encode(user.getPswd()));
            User savedUser = userRepository.save(user);
            log.info("User saved successfully: {}", savedUser.getUserName());
            return savedUser;
        } catch (Exception e) {
            log.error("Error while saving user: {}", e.getMessage());
            throw e; // Re-throw the exception to trigger transaction rollback
        }
    }
}
