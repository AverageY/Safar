package com.safar.Backend.repository;


import com.safar.Backend.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {
    Trip findByTripId(Integer tripId);
    List<Trip> findByHostUserUserId(Integer userId);
    List<Trip> findByRidersUserUserId(Integer userId);  //many to many so Riders
    List<Trip> findByDriverUserUserId(Integer userId);
}

