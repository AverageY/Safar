package com.safar.Backend.payload;

import lombok.Data;

@Data
public class TripDto {

    private String tripPickuplocation;
    private String tripPickuppoint;
    private String tripDroplocation;
    private double tripDistance;
    private String tripDeparturetime;
    private String tripCabtype;
    private String tripSeat;


}
