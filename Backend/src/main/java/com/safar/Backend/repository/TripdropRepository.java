package com.safar.Backend.repository;

import com.safar.Backend.model.Tripdrop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TripdropRepository extends JpaRepository<Tripdrop, Integer> {
}
