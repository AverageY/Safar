package com.safar.Backend.repository;


import com.safar.Backend.model.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostRepository extends JpaRepository<Host, Integer> {
    List<Host> findByUserUserId(Integer userId);
}

