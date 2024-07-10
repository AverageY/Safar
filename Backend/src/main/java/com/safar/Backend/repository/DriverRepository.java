package com.safar.Backend.repository;

import com.safar.Backend.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    Driver findByDriverId(Integer driverId);
    Driver findByUserUserId(Integer userId);

}

