package com.safar.Backend.service;

import com.safar.Backend.model.Cab;
import com.safar.Backend.model.Driver;
import com.safar.Backend.model.User;
import com.safar.Backend.repository.CabRepository;
import com.safar.Backend.repository.DriverRepository;
import com.safar.Backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private CabRepository cabRepository;

    @Autowired
    private UserRepository userRepository;

    private Driver driver;
    //serves /addcab
    public Driver addCabToDriver( @Valid Cab cab, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("No session found. User is not logged in.");
        }

        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("No user ID found in session.");
        }


        driver = driverRepository.findByUserUserId(userId);


       if (!driver.getUser().getUserType().equalsIgnoreCase("Driver")) {
            throw new RuntimeException("User is not a driver");}


        cab.setDriver(driver);
        driver.getCabs().add(cab);
        cabRepository.save(cab);

        driver = driverRepository.save(driver);
        return driver;
    }
    //serves /getcabs
    public List<Cab> getCabsByDriverId( HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("No session found. User is not logged in.");
        }

        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("No user ID found in session.");
        }
        Driver driver = driverRepository.findByUserUserId(userId);
        return driver.getCabs();
    }
    //serves /getdriver?driverId
    public Driver getDriverDetails(Integer driverId) {
        Optional<Driver> driver = driverRepository.findById(driverId);
        return driver.orElse(null);
    }

}



