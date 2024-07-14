package com.safar.Backend.payload;

import com.safar.Backend.model.Trippickup;
import lombok.Data;

@Data
public class TripRiderDto {
    private Trippickup trippickup;
    private String tripSeat;
}
