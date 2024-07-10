package com.safar.Backend.controller;


import com.safar.Backend.model.Cab;
import com.safar.Backend.repository.DriverRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import com.safar.Backend.model.Driver;
import com.safar.Backend.service.DriverService;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping(path = "/driver",produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins="*")
public class DriverController {
    @Autowired
    private DriverService driverService;
    @Autowired
    private DriverRepository driverRepository;


    @PostMapping("/addcab")
        public ResponseEntity<?> addCab(@RequestBody Cab cab, HttpServletRequest httpServletRequest) {
        Driver driver = driverService.addCabToDriver(cab, httpServletRequest);
        if (driver == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add cab to driver.");
        }

        return ResponseEntity
                .ok(driver);



    }

    @GetMapping("/getcabs")
        public ResponseEntity<?> getCabs(HttpServletRequest request) {
        List<Cab> cabs = driverService.getCabsByDriverId(request);
        return ResponseEntity.ok(cabs);
    }



}
