package com.safar.Backend.controller;

import com.safar.Backend.model.Trip;
import com.safar.Backend.payload.*;
import com.safar.Backend.repository.TripRepository;
import com.safar.Backend.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trip")
public class TripController {

    @Autowired
    private TripService tripService;
    @Autowired
    private TripRepository tripRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addTrip(@RequestBody TripDto tripDto, HttpServletRequest request) {
        try {
            Trip trip = tripService.addTrip(tripDto, request);
            return ResponseEntity.ok(trip);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/book/{tripId}")
    public ResponseEntity<?> bookTrip(@PathVariable int tripId, @RequestBody TripRiderDto tripRiderDto, HttpServletRequest request) {
        try {
            Trip trip = tripService.bookTrip(tripId, tripRiderDto, request);
            return ResponseEntity.ok(trip);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/accept/{tripId}")
    public ResponseEntity<?> acceptTrip(@PathVariable int tripId, @RequestBody TripDriverDto tripDriverDto, HttpServletRequest request) {
        try {
            Trip trip = tripService.acceptTrip(tripId, tripDriverDto, request);
            return ResponseEntity.ok(trip);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/usertrips")
    public ResponseEntity<?> getTripofUser(HttpServletRequest request) {
        try {
            List<Trip> trips = tripService.getTripsOfUser(request);
            return ResponseEntity.ok(trips);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<?> getTrip(@PathVariable int tripId) {
        try {
            Trip trip = tripRepository.findByTripId(tripId);
            return ResponseEntity.ok(trip);
        }catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

   /* @PostMapping("/search")
    public ResponseEntity<?> searchTrip(@RequestBody TripSearchDto tripSearchDto){
       try {
           return ResponseEntity.ok(tripService.searchTrips(tripSearchDto));
       }catch (RuntimeException e) {
           return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
       }
    }*/
}
