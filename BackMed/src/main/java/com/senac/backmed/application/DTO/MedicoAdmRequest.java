package com.senac.backmed.application.DTO;

public record MedicoAdmRequest(
        String nome,
        String crm,
        String especialidade,
        String email,
        String senha,
        String secretKey
) {
}
