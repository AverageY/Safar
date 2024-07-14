package com.safar.Backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "trip")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tripId;

    @ManyToOne
    @JoinColumn(name = "host_id", nullable = true)
    @JsonBackReference
    private Host host;


    @ManyToMany(mappedBy = "trips", targetEntity = Rider.class)
    @JsonBackReference
    private List<Rider> riders = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = true)
    @JsonBackReference
    private Driver driver;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Cab.class)
    @JoinColumn(name = "cab_id", referencedColumnName = "cab_id")
    private Cab cab;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Trippickup.class)
    @JoinColumn(name = "trippickup_id", referencedColumnName = "trippickup_id")

    private Trippickup trippickup;


    @NotBlank(message = "Pickup location cant be blank")
    @Size(min = 3, message = "Min size for pickup location is 3")
    private String tripPickuplocation;



    @NotBlank(message = "Pickup location cant be blank")
    @Size(min = 3, message = "Min size for pickup location is 3")
    private String tripDroplocation;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Tripdrop.class)
    @JoinColumn(name = "tripdrop_id", referencedColumnName = "tripdrop_id")

    private Tripdrop tripdrop;

    @NotBlank
    private double tripDistance;

    @NotBlank(message = "Pickup time cant be blank")
    @Size(min = 3, message = "Min size for pickup time is 3")
    private String tripDeparturetime;

    @NotBlank(message = "trip date cant be blank")
    private int tripDate;

    @NotBlank(message = "Cab type cant be blank")
    @Size(min = 3, message = "Min size for cab type is 3")
    private String tripCabtype;

    @NotBlank
    private double tripPrice;

    @NotBlank
    private int tripOtp;

    private boolean tripStatus = false;

}
