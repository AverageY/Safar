package com.safar.Backend.payload;

import com.safar.Backend.model.Trippickup;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TripRiderDto {
    @NotBlank
    private Trippickup trippickup;
    @NotBlank
    private String tripSeat;
}
