package com.safar.Backend.model;



import com.fasterxml.jackson.annotation.JsonProperty;
import com.safar.Backend.annotation.PasswordValidator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;




@Getter
@Setter
@Entity
@Table(name="user")

public class User extends BaseEntity{

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @NotBlank(message="Name must not be blank")
    @Size(min=3, message="Name must be at least 3 characters long")
    @Column(unique = true)
    private String userName;

    @NotBlank(message="Mobile number must not be blank")
    @Pattern(regexp="(^$|[0-9]{10})",message = "Mobile number must be 10 digits")
    @Column(unique = true)
    private String mobileNum;

    @ManyToOne(fetch = FetchType.EAGER) // Changed from @OneToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id", nullable = false)
    @JsonIgnore // Prevents serialization issues
    private Roles roles;

    @NotBlank(message = "Please upload a profile picture")
    private String profileImg;



    @NotBlank(message="Password must not be blank")
    @Size(min=5, message="Password must be at least 5 characters long")
    @PasswordValidator
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String pswd;

    @NotBlank(message="Type must not be blank")
    private String userType;






}

