package com.senac.backmed.domain.repository;


import com.senac.backmed.domain.entities.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    boolean existsMedicoByEmailContainingAndSenha(String email, String senha);


    Optional<Medico> findByEmail(String email);
}
