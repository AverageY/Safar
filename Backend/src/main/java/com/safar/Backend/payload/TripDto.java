package com.safar.Backend.payload;

import com.safar.Backend.model.Tripdrop;
import com.safar.Backend.model.Trippickup;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Data
public class TripDto {
    @NotBlank
    private String tripPickuplocation;

    private Trippickup trippickup;
    @NotBlank
    private String tripDroplocation;

    private Tripdrop tripdrop;

    private double tripDistance;
    @NotBlank
    private String tripDeparturetime;

    private int tripDate;
    @NotBlank
    private String tripCabtype;
    @NotBlank
    private String tripSeat;


}
