package com.safar.Backend.controller;

import com.safar.Backend.payload.ApiResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
@Order(1)
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        ApiResponse response = new ApiResponse(false,
                ex.getBindingResult().toString());
        return new ResponseEntity(response.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiResponse> exceptionHandler(Exception exception){
        ApiResponse response = new ApiResponse(false,
                exception.getMessage());
        return new ResponseEntity(response.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
