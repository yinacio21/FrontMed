package com.senac.backmed.domain.repository;

import com.senac.backmed.domain.entities.Prontuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {

    List<Prontuario> findByMedico_Id(Long medicoId);

    List<Prontuario> findByPaciente_Id(Long pacienteId);

    List<Prontuario> findTop5ByMedico_IdOrderByDataDesc(Long medicoId);
}
