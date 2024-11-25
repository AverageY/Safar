package com.safar.Backend.repository;

import com.safar.Backend.model.Cab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabRepository extends JpaRepository<Cab, Integer> {
 Cab findByCabId(int cabId);
}
