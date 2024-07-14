package com.safar.Backend.payload;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class TripSearchDto {
    private String tripPickuplocation;
    private String tripDroplocation;
    private String tripDeparturetime;
    private @DateTimeFormat(pattern = "yyyy-MM-dd") Date tripDate;
}
