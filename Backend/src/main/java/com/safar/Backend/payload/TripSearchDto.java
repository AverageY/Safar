package com.safar.Backend.payload;

import com.safar.Backend.model.Tripdrop;
import com.safar.Backend.model.Trippickup;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class TripSearchDto {
    @NotBlank
    private Trippickup trippickup;
    @NotBlank
    private Tripdrop tripdrop;
    @NotBlank
    private String tripDeparturetime;
    @NotBlank
    private int tripDate;
}
