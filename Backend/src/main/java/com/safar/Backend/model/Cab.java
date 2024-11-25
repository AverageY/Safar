package com.safar.Backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "cab")
public class Cab extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cab_id")
    private int cabId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = false)
    @JsonBackReference
    private Driver driver;

    @NotBlank(message = "car number cant be blank")
    @Size(min=10, message="number must be at least 10 characters long")
    private String cabNumber;

    @NotBlank(message = "car name cant be blank")
    @Size(min=3, message="car name must be at least 3 characters long")
    private String cabName;

    @NotBlank(message = "car color cant be blank")
    @Size(min=3, message="color must be at least 3 characters long")
    private String cabColor;

    @NotBlank(message = "car type cant be blank")
    @Size(min=3, message="type must be at least 3 characters long")
    private String cabType;




}
