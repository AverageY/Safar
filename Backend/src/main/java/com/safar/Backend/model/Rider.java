package com.safar.Backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@Table(name = "rider")

public class Rider {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int riderId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToMany(targetEntity = Trip.class)
   /* @JoinTable(
            name = "rider_trip",
            joinColumns = @JoinColumn(name = "rider_id"),
            inverseJoinColumns = @JoinColumn(name = "trip_id")
    ) */
    @JsonManagedReference
    private List<Trip> trips = new ArrayList<>();

    @NotBlank(message = "Pickup location cant be blank")
    @Size(min = 3, message = "Min size for pickup location is 3")
    private String tripPickup;

    @NotBlank(message = "Seat cant be blank")
    @Size(min = 4, message = "Min size for seat is 4")
    private String tripSeat;

}

