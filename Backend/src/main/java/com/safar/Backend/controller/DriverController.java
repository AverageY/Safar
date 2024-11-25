package com.safar.Backend.controller;

import com.safar.Backend.model.Cab;
import com.safar.Backend.model.Driver;
import com.safar.Backend.payload.ApiResponse;
import com.safar.Backend.service.DriverService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping("/addcab")
    public ResponseEntity<?> addCabToDriver(@RequestBody Cab cab, HttpServletRequest request) {
        try {
            Driver driver = driverService.addCabToDriver(cab, request);
            return ResponseEntity.ok(driver);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/getcabs")
    public ResponseEntity<?> getCabsByDriverId(HttpServletRequest request) {
        try {
            List<Cab> cabs = driverService.getCabsByDriverId(request);
            return ResponseEntity.ok(cabs);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/getdriver")
    public ResponseEntity<?> getDriverDetails(@RequestParam Integer driverId) {
        Driver driver = driverService.getDriverDetails(driverId);
        if (driver == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Driver not found"));
        }
        return ResponseEntity.ok(driver);
    }
}
