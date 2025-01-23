package com.safar.Backend.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDto {
    @NotBlank
    private String userName;
    @NotBlank
    private String pswd;
}
