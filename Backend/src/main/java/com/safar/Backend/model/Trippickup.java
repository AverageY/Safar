package com.safar.Backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name="trippickup")
public class Trippickup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "trippickup_id")
    private int trippickupId;

    @NotBlank
    private double lat;

    @NotBlank
    private double lng;


}
