package com.safar.Backend.service;
import com.safar.Backend.repository.UserRepository;
import com.safar.Backend.repository.RolesRepository;
import com.safar.Backend.model.User;
import com.safar.Backend.model.Roles;
import com.safar.Backend.constant.SafarConstant;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createNewUser(User user){


        boolean isSaved = false;
        Roles role = rolesRepository.getByRoleName(SafarConstant.BASE_ROLE);
        user.setRoles(role);
        user.setPswd(passwordEncoder.encode(user.getPswd()));
        user = UserRepository.save(user);
        isSaved = true;
        log.info(user.getPswd());
        return user;


    }
}


