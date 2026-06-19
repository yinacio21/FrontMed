
package com.senac.backmed.application.services;

import com.senac.backmed.application.DTO.DashboardResponse;
import com.senac.backmed.application.DTO.ProntuarioResponse;
import com.senac.backmed.domain.entities.Medico;
import com.senac.backmed.domain.repository.PacienteRepository;
import com.senac.backmed.domain.repository.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    public DashboardResponse buscarDadosDashboard(Authentication authentication) {
        Medico medico = (Medico) authentication.getPrincipal();

        long totalPacientes = pacienteRepository.countByMedico_Id(medico.getId());

        List<ProntuarioResponse> ultimosProntuarios = prontuarioRepository
                .findTop5ByMedico_IdOrderByDataDesc(medico.getId())
                .stream()
                .map(ProntuarioResponse::new)
                .collect(Collectors.toList());

        return new DashboardResponse(
                medico.getNome(),
                medico.getCrm(),
                medico.getEspecialidade(),
                totalPacientes,
                ultimosProntuarios
        );
    }
}
