package com.safar.Backend.controller;

import com.safar.Backend.model.Trip;
import com.safar.Backend.payload.*;
import com.safar.Backend.repository.TripRepository;
import com.safar.Backend.service.TripService;
import com.safar.Backend.utils.GeoUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/trip")
public class TripController {

    @Autowired
    private TripService tripService;
    @Autowired
    private TripRepository tripRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addTrip(@Valid @RequestBody TripDto tripDto, HttpServletRequest request) {
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
            log.info("bro the data sis" +tripRiderDto.getTripSeat());
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


    @PostMapping("/search")
    public List<Trip> searchTrips(@RequestBody TripSearchDto searchDto) throws ParseException {
        return tripService.searchTrips(searchDto);
    }

    @GetMapping("/bookedseat/{tripId}")
    public ResponseEntity<List<String>> getBookedSeats(@PathVariable int tripId) {
        List<String> bookedSeats = tripService.getBookedSeats(tripId);
        return ResponseEntity.ok(bookedSeats);
    }


    @PutMapping("/update/{tripId}")
    public ResponseEntity<?> updateTrip(HttpServletRequest request, @PathVariable int tripId, @RequestBody TripDto tripDto, Errors errors) {


        HttpSession session = request.getSession(false);
        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "User not logged in"));
        }

        Trip existingTrip = tripRepository.findByTripId(tripId);
        if (existingTrip == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Trip not found"));
        }
        if (existingTrip.getHost().getUser().getUserId()!=userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse(false, "User not authorized to update this trip"));
        }

        // Update trip details
    if(tripDto.getTripDate()!=0){
        existingTrip.setTripDate(tripDto.getTripDate());
    }
    if(tripDto.getTripDeparturetime()!=null){
        existingTrip.setTripDeparturetime(tripDto.getTripDeparturetime());
    }
    if(tripDto.getTripDistance()!=existingTrip.getTripDistance()){

        existingTrip.setTripDistance(tripDto.getTripDistance());
    }
    if(tripDto.getTripSeat()!=null){
        existingTrip.getHost().setTripSeat(tripDto.getTripSeat());
    }
    if(tripDto.getTripDroplocation()!=null){
        existingTrip.setTripDroplocation(tripDto.getTripDroplocation());
    }
    if(tripDto.getTripPickuplocation()!=null){
        existingTrip.setTripPickuplocation(tripDto.getTripPickuplocation());
    }
    if(tripDto.getTripCabtype()!=null){
        existingTrip.setTripCabtype(tripDto.getTripCabtype());
        double price;
        if (tripDto.getTripCabtype().equalsIgnoreCase("Sedan")) {
            price  = (tripDto.getTripDistance()+ (0.45)*GeoUtils.distance(
                    existingTrip.getTripdrop().getLat(),
                    existingTrip.getTripdrop().getLng(),
                    tripDto.getTrippickup().getLat(),
                    tripDto.getTrippickup().getLng())) * 13;
            existingTrip.setTripPrice(price);
        } else if (tripDto.getTripCabtype().equalsIgnoreCase("SUV")) {
            price = (tripDto.getTripDistance()+ (0.6)*GeoUtils.distance(
                    existingTrip.getTripdrop().getLat(),
                    existingTrip.getTripdrop().getLng(),
                    tripDto.getTrippickup().getLat(),
                    tripDto.getTrippickup().getLng())) * 30;
            existingTrip.setTripPrice(price);
        }
    }
    if(tripDto.getTripdrop()!=null){
        existingTrip.setTripdrop(tripDto.getTripdrop());
    }
    if(!(tripDto.getTrippickup() == null)){
        existingTrip.setTrippickup(tripDto.getTrippickup());
    }


        tripRepository.save(existingTrip);

        return ResponseEntity.ok(new ApiResponse(true, "Trip updated successfully"));
    }

    @DeleteMapping("/delete/{tripId}")
    public ResponseEntity<?> deleteTrip(HttpServletRequest request, @PathVariable int tripId) {
        HttpSession session = request.getSession(false);
        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "User not logged in"));
        }

        Trip existingTrip = tripRepository.findByTripId(tripId);
        if (existingTrip == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Trip not found"));
        }

        // Check if the logged-in user is the host of the trip
        if (existingTrip.getHost().getUser().getUserId()!=userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse(false, "User not authorized to delete this trip"));
        }

        tripRepository.delete(existingTrip);

        return ResponseEntity.ok(new ApiResponse(true, "Trip deleted successfully"));
    }
}
