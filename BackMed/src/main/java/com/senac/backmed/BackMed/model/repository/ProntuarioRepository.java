package com.senac.backmed.BackMed.model.repository;

import com.senac.backmed.BackMed.model.entities.Prontuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProntuarioRepository extends JpaRepository<Prontuario,Long> {
}
