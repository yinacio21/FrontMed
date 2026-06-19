package com.senac.backmed.application.DTO;

public record PacienteRequest(
        String nome,
        String cpf,
        String cep,
        String logradouro,
        String numero,
        String complemento,
        String bairro,
        String estado,
        String cidade
) {
}
