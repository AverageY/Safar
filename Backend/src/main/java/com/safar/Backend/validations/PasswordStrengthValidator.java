package com.safar.Backend.validations;


import com.safar.Backend.annotation.PasswordValidator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;

public class PasswordStrengthValidator implements
        ConstraintValidator<PasswordValidator, String> {

    List<String> weakPasswords;

    @Override
    public void initialize(PasswordValidator passwordValidator) {
        weakPasswords = Arrays.asList(
                "123456",
                "password",
                "123456789",
                "12345678",
                "12345",
                "1234567",
                "admin",
                "123123",
                "qwerty",
                "abc123",
                "letmein",
                "monkey",
                "111111",
                "password1",
                "qwerty123",
                "dragon",
                "1234",
                "baseball",
                "iloveyou",
                "trustno1",
                "sunshine",
                "princess",
                "football",
                "welcome",
                "shadow",
                "superman",
                "michael",
                "ninja",
                "mustang",
                "jessica",
                "charlie",
                "ashley",
                "bailey",
                "passw0rd",
                "master",
                "love",
                "hello",
                "freedom",
                "whatever",
                "nicole",
                "jordan",
                "cameron",
                "secret",
                "summer",
                "1q2w3e4r",
                "zxcvbnm",
                "starwars",
                "computer",
                "taylor",
                "startrek"

);
    }

    @Override
    public boolean isValid(String passwordField,
                           ConstraintValidatorContext cxt) {
        return passwordField != null && (!weakPasswords.contains(passwordField));
    }
}
