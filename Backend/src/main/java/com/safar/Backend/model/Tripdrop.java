package com.safar.Backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tripdrop")
public class Tripdrop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tripdrop_id")
    private int tripdropId;

    @NotBlank
    private double lat;

    @NotBlank
    private double lng;

}
