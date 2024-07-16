package com.safar.Backend.service;

import com.safar.Backend.model.*;
import com.safar.Backend.payload.TripDriverDto;
import com.safar.Backend.payload.TripDto;
import com.safar.Backend.payload.TripRiderDto;
import com.safar.Backend.payload.TripSearchDto;
import com.safar.Backend.repository.*;
import com.safar.Backend.utils.GeoUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;


import java.security.SecureRandom;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TripService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TripRepository tripRepository;

    @Autowired
    HostRepository hostRepository;

    @Autowired
    CabRepository cabRepository;

    @Autowired
    DriverRepository driverRepository;

    @Autowired
    RiderRepository riderRepository;

    private Driver driver;

    public Trip addTrip(TripDto tripdto, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new IllegalArgumentException("No active session found");
        }
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("No userId found in session");
        }

        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        Host host = new Host();
        host.setUser(user);

        Trip trip = new Trip();
        trip.setHost(host);
        trip.setTripPickuplocation(tripdto.getTripPickuplocation());
        trip.setTrippickup(tripdto.getTrippickup());
        trip.setTripDroplocation(tripdto.getTripDroplocation());
        trip.setTripdrop(tripdto.getTripdrop());
        trip.setTripDeparturetime(tripdto.getTripDeparturetime());
        trip.setTripDate(tripdto.getTripDate());
        trip.setTripCabtype(tripdto.getTripCabtype());
        trip.setTripDistance(tripdto.getTripDistance());

        SecureRandom random = new SecureRandom();
        final int otp = 1000 + random.nextInt(9000);
        trip.setTripOtp(otp);
        TripSearchDto tripsearchdto = new TripSearchDto();
        tripsearchdto.setTripDate(tripdto.getTripDate());
        tripsearchdto.setTripDeparturetime(tripdto.getTripDeparturetime());
        tripsearchdto.setTripdrop(tripdto.getTripdrop());
        tripsearchdto.setTrippickup(tripdto.getTrippickup());

        double price;
        if (trip.getTripCabtype().equalsIgnoreCase("Sedan")) {
            price = trip.getTripDistance() * 13;
        } else if (trip.getTripCabtype().equalsIgnoreCase("SUV")) {
            price = trip.getTripDistance() * 30;
        } else {
            throw new IllegalArgumentException("Invalid cab type");
        }

        try {
            List<Trip> matchingTrips = searchTrips(tripsearchdto);
            if (matchingTrips.size() >=5) {
                price*=1.4;
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }




        trip.setTripPrice(price);

        host.setTripSeat(tripdto.getTripSeat());
        host.getTrips().add(trip);

        hostRepository.save(host);
        trip = tripRepository.save(trip);

        return trip;
    }

    public Trip bookTrip(int tripId, TripRiderDto tripRiderDto, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new IllegalArgumentException("No active session found");
        }
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("No userId found in session");
        }

        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        Trip trip = tripRepository.findByTripId(tripId);
        if (trip == null) {
            throw new IllegalArgumentException("Trip not found");
        }

        // Check if the number of riders exceeds the limit based on cab type
        int currentRiders = trip.getRiders().size();
        if (trip.getTripCabtype().equalsIgnoreCase("Sedan") && (currentRiders  > 3)) {
            throw new IllegalArgumentException("Sedan cannot have more than 3 riders");
        } else if (trip.getTripCabtype().equalsIgnoreCase("SUV") && (currentRiders > 5)) {
            throw new IllegalArgumentException("SUV cannot have more than 5 riders");
        }

        Rider rider = new Rider();
        rider.setUser(user);
        rider.setTrippickup(tripRiderDto.getTrippickup());
        rider.setTripSeat(tripRiderDto.getTripSeat());

        trip.getRiders().add(rider);
        rider.getTrips().add(trip);
        riderRepository.save(rider);

        trip = tripRepository.save(trip);

        return trip;
    }

    public Trip acceptTrip(int tripId, TripDriverDto tripDriverDto, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new IllegalArgumentException("No active session found");
        }
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("No userId found in session");
        }

        driver = driverRepository.findByUserUserId(userId);
        if (driver == null) {
            throw new IllegalArgumentException("Driver not found");
        }

        Trip trip = tripRepository.findByTripId(tripId);
        if (trip == null) {
            throw new IllegalArgumentException("Trip not found");
        }

        Cab cab = cabRepository.findByCabId(tripDriverDto.getCabId());
        if (cab == null) {
            throw new IllegalArgumentException("Cab not found");
        }
    if(cab.getCabType().equalsIgnoreCase(trip.getTripCabtype())) {
        trip.setDriver(driver);
        trip.setCab(cab);
        trip.setTripStatus(true);
        driver.getTrips().add(trip);
        driverRepository.save(driver);

        trip = tripRepository.save(trip);
    }

        return trip;
    }

    public List<Trip> getTripsOfUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new IllegalArgumentException("No active session found");
        }
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("No userId found in session");
        }

        List<Trip> hostTrips = tripRepository.findByHostUserUserId(userId);
        List<Trip> riderTrips = tripRepository.findByRidersUserUserId(userId);
        List<Trip> driverTrips = tripRepository.findByDriverUserUserId(userId);

        List<Trip> allTrips = new ArrayList<>();
        if (hostTrips != null) {
            allTrips.addAll(hostTrips);
        }
        if (riderTrips != null) {
            allTrips.addAll(riderTrips);
        }
        if (driverTrips != null) {
            allTrips.addAll(driverTrips);
        }

        return allTrips;
    }

   public List<Trip> searchTrips(TripSearchDto searchDto) throws ParseException {
       List<Trip> trips = tripRepository.findByTripDate(searchDto.getTripDate());

       SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");
       Date searchTime = dateFormat.parse(searchDto.getTripDeparturetime());

       return trips.stream()
               .filter(trip -> {
                   try {
                       Date tripTime = dateFormat.parse(trip.getTripDeparturetime());
                       long difference = Math.abs(tripTime.getTime() - searchTime.getTime());
                       long differenceInMinutes = difference / (60 * 1000);
                       return differenceInMinutes <= 30;
                   } catch (ParseException e) {
                       return false;
                   }
               })
               .filter(trip -> {
                   if (trip.getTrippickup() == null || trip.getTripdrop() == null) {
                       return false;
                   }

                   Trippickup tripPickup = trip.getTrippickup();
                   Tripdrop tripDrop = trip.getTripdrop();
                   Trippickup searchPickup = searchDto.getTrippickup();
                   Tripdrop searchDrop = searchDto.getTripdrop();

                   if (searchPickup == null || searchDrop == null) {
                       return false;
                   }

                   double pickupDistance = GeoUtils.distance(
                           searchPickup.getLat(),
                           searchPickup.getLng(),
                           tripPickup.getLat(),
                           tripPickup.getLng());

                   double dropDistance = GeoUtils.distance(
                           searchDrop.getLat(),
                           searchDrop.getLng(),
                           tripDrop.getLat(),
                           tripDrop.getLng());

                   return pickupDistance <= 1 && dropDistance <= 1;
               })
               .collect(Collectors.toList());
   }

    public List<String> getBookedSeats(int tripId) {
        Trip trip = tripRepository.findByTripId(tripId);
        List<String> bookedSeats = new ArrayList<>();

        // Assuming Trip has Host and Rider entities associated with it

                bookedSeats.add(trip.getHost().getTripSeat());



        for (Rider rider : trip.getRiders()) {
            if (rider.getTripSeat() != null) {
                bookedSeats.add(rider.getTripSeat());
            }
        }

        return bookedSeats;
    }

}
