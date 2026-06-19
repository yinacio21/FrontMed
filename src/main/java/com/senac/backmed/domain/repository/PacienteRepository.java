package com.senac.backmed.domain.repository;

import com.senac.backmed.domain.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    List<Paciente> findByMedico_Id(Long medicoId);

    long countByMedico_Id(Long medicoId);

    boolean existsByCpfAndMedico_Id(String cpf, Long medicoId);

    boolean existsByCpfAndMedico_IdAndIdNot(String cpf, Long medicoId, Long id);
}
