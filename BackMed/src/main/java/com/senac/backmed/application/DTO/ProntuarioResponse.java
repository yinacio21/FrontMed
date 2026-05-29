package com.senac.backmed.application.DTO;

import com.senac.backmed.domain.entities.Prontuario;

import java.time.LocalDate;

public record ProntuarioResponse(
        Long id,
        LocalDate data,
        String anotacoesClinicas,
        Long pacienteId,
        String pacienteNome,
        Long medicoId,
        String medicoNome
) {
    public ProntuarioResponse(Prontuario prontuario) {
        this(
                prontuario.getId(),
                prontuario.getData(),
                prontuario.getAnotacoesClinicas(),
                prontuario.getPaciente() != null ? prontuario.getPaciente().getId() : null,
                prontuario.getPaciente() != null ? prontuario.getPaciente().getNome() : null,
                prontuario.getMedico() != null ? prontuario.getMedico().getId() : null,
                prontuario.getMedico() != null ? prontuario.getMedico().getNome() : null
        );
    }
}
