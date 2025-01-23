package com.safar.Backend.repository;



import com.safar.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByMobileNum(String mobileNumber);
    User findByUserId(Integer userId);
    User findByUserName(String username);


}

