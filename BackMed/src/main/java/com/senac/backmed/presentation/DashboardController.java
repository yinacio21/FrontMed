package com.senac.backmed.presentation;

import com.senac.backmed.application.DTO.DashboardResponse;
import com.senac.backmed.application.services.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Dashboard", description = "Serviço responsável por fornecer os dados consolidados do painel do médico logado")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    @Operation(summary = "Dados do dashboard", description = "Retorna total de pacientes, últimos prontuários e dados do médico logado")
    public ResponseEntity<DashboardResponse> buscarDados(Authentication authentication) {
        return ResponseEntity.ok(dashboardService.buscarDadosDashboard(authentication));
    }
}
