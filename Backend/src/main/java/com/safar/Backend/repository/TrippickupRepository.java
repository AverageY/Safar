package com.safar.Backend.repository;

import com.safar.Backend.model.Trippickup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TrippickupRepository extends JpaRepository<Trippickup, Integer> {
}
