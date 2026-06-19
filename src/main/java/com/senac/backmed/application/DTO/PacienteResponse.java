package com.senac.backmed.application.DTO;

import com.senac.backmed.domain.entities.Paciente;

public record PacienteResponse(
        Long id,
        String nome,
        String cpf,
        String cep,
        String logradouro,
        String numero,
        String complemento,
        String bairro,
        String estado,
        String cidade,
        Long medicoId,
        String medicoNome
) {
    public PacienteResponse(Paciente paciente) {
        this(
                paciente.getId(),
                paciente.getNome(),
                paciente.getCpf(),
                paciente.getCep(),
                paciente.getLogradouro(),
                paciente.getNumero(),
                paciente.getComplemento(),
                paciente.getBairro(),
                paciente.getEstado(),
                paciente.getCidade(),
                paciente.getMedico() != null ? paciente.getMedico().getId() : null,
                paciente.getMedico() != null ? paciente.getMedico().getNome() : null
        );
    }
}
