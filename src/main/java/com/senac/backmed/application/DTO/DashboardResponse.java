package com.senac.backmed.application.DTO;

import java.util.List;

public record DashboardResponse(
        String medicoNome,
        String medicoCrm,
        String medicoEspecialidade,
        long totalPacientes,
        List<ProntuarioResponse> ultimosProntuarios
) {
}
