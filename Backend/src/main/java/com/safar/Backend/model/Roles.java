package com.safar.Backend.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "roles")
public class Roles extends BaseEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int roleId;

    @Column(name = "role_name", unique = true, nullable = false)
    private String roleName;
}
