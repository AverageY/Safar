package com.safar.Backend.repository;


import com.safar.Backend.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {
    Trip findByTripId(Integer tripId);
    List<Trip> findByHostUserUserId(Integer userId);
    List<Trip> findByRidersUserUserId(Integer userId);  //many to many so Riders
    List<Trip> findByDriverUserUserId(Integer userId);

    @Query("SELECT t FROM Trip t WHERE t.trippickup.lat = :pickupLat AND t.trippickup.lng = :pickupLng")
    List<Trip> findByPickupCoordinates(@Param("pickupLat") double pickupLat, @Param("pickupLng") double pickupLng);

    @Query("SELECT t FROM Trip t WHERE t.tripdrop.lat = :dropLat AND t.tripdrop.lng = :dropLng")
    List<Trip> findByDropCoordinates(@Param("dropLat") double dropLat, @Param("dropLng") double dropLng);
}



