package com.senac.backmed.application.DTO;

import com.senac.backmed.domain.entities.Medico;

public record MedicoResponde(
        Long id,
        String nome,
        String crm,
        String especialidade,
        String email,
        String status
) {
    public MedicoResponde(Medico medico) {
        this(
                medico.getId(),
                medico.getNome(),
                medico.getCrm(),
                medico.getEspecialidade(),
                medico.getEmail(),
                medico.getStatus().toString()
        );
    }
}
