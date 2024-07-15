package com.safar.Backend.payload;

import com.safar.Backend.model.Tripdrop;
import com.safar.Backend.model.Trippickup;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class TripSearchDto {
    private Trippickup trippickup;
    private Tripdrop tripdrop;
    private String tripDeparturetime;
    private int tripDate;
}
