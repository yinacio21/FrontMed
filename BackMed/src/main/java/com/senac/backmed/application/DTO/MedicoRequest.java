package com.senac.backmed.application.DTO;

public record MedicoRequest(
        String nome,
        String crm,
        String especialidade,
        String email,
        String senha
) {
}
