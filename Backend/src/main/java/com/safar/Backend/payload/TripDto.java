package com.safar.Backend.payload;

import lombok.Data;

import java.util.Date;

@Data
public class TripDto {

    private String tripPickuplocation;
    private String tripPickuppoint;
    private String tripDroplocation;
    private double tripDistance;
    private String tripDeparturetime;
    private Date tripDate;
    private String tripCabtype;
    private String tripSeat;


}
