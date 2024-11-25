package com.safar.Backend.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "roles")
public class Roles extends BaseEntity {

    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)

    private int roleId;

    @Column(name = "role_name")
    private String roleName;

}

