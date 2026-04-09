package com.senac.backmed.BackMed.model.repository;


import com.senac.backmed.BackMed.model.entities.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

}
