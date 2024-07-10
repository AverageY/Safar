package com.safar.Backend.payload;

import lombok.Data;

@Data
public class LoginDto {
    private String userName;
    private String pswd;
}
