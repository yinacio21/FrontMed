package com.senac.backmed.BackMed.model.repository;

import com.senac.backmed.BackMed.model.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
