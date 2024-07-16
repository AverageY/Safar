package com.safar.Backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.*;

@Data
@Entity
@Table(name = "host")
public class Host {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int hostId;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;


    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Trip> trips = new ArrayList<Trip>();


    @NotBlank(message = "Seat cant be blank")
    @Size(min = 4, message = "Min size for seat is 4")
    private String tripSeat;
}
