package com.senac.backmed.application.DTO;

import java.time.LocalDate;

public record ProntuarioRequest(
        LocalDate data,
        String anotacoesClinicas,
        Long pacienteId
) {
}
