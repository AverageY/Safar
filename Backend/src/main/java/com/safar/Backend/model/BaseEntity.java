package com.safar.Backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)

public class BaseEntity {

    @CreatedDate
    @Column(name="created_at",updatable = false)
    @JsonIgnore
    private LocalDateTime createdAt;

    @CreatedBy
    @Column(name="created_by",updatable = false)
    @JsonIgnore
    private String createdBy;

    @LastModifiedDate
    @Column(name="updated_at",insertable = false)
    @JsonIgnore
    private LocalDateTime updatedAt;

    @LastModifiedBy
    @Column(name="updated_by",insertable = false)
    @JsonIgnore
    private String updatedBy;
}

