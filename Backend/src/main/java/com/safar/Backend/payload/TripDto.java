package com.safar.Backend.payload;

import com.safar.Backend.model.Tripdrop;
import com.safar.Backend.model.Trippickup;
import lombok.Data;

import java.util.Date;

@Data
public class TripDto {

    private String tripPickuplocation;
    private Trippickup trippickup;
    private String tripDroplocation;
    private Tripdrop tripdrop;
    private double tripDistance;
    private String tripDeparturetime;
    private int tripDate;
    private String tripCabtype;
    private String tripSeat;


}
