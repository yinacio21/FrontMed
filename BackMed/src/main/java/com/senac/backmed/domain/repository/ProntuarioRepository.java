package com.senac.backmed.domain.repository;

import com.senac.backmed.domain.entities.Prontuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProntuarioRepository extends JpaRepository<Prontuario,Long> {
}
