package com.senac.backmed.domain.repository;

import com.senac.backmed.domain.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
