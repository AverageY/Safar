package com.safar.Backend.payload;

import lombok.Data;

@Data
public class LoginDto {
    private String mobileNum;
    private String pswd;
}
