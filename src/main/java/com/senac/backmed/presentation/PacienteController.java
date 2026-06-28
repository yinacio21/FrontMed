package com.senac.backmed.presentation;

import com.senac.backmed.application.DTO.PacienteRequest;
import com.senac.backmed.application.DTO.PacienteResponse;
import com.senac.backmed.application.services.PacienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "controller de pacientes", description = "Serviço responsável por controlar o gerenciamento da entidade paciente!")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @GetMapping
    @Operation(summary = "Listar pacientes do médico logado", description = "Lista apenas os pacientes vinculados ao médico autenticado")
    public ResponseEntity<List<PacienteResponse>> listarTodos(Authentication authentication) {
        return ResponseEntity.ok(pacienteService.listarTodos(authentication));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar paciente por ID", description = "Busca um paciente do médico logado pelo ID")
    public ResponseEntity<PacienteResponse> buscarPorId(@PathVariable Long id, Authentication authentication) {
        var paciente = pacienteService.buscarPorId(id, authentication);
        if (paciente == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(paciente);
    }

    @PostMapping
    @Operation(summary = "Cadastrar paciente", description = "Cadastra um novo paciente vinculado ao médico logado")
    public ResponseEntity<?> salvar(@RequestBody PacienteRequest pacienteRequest, Authentication authentication) {
        try {
            return ResponseEntity.ok(pacienteService.salvarPaciente(pacienteRequest, authentication));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar paciente", description = "Edita os dados de um paciente no sistema")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody PacienteRequest pacienteRequest, Authentication authentication) {
        try {
            boolean atualizado = pacienteService.atualizarPaciente(id, pacienteRequest, authentication);
            return atualizado ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir paciente", description = "Remove um paciente do sistema")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        boolean deletado = pacienteService.deletarPaciente(id);
        return deletado ? ResponseEntity.ok("Deletado com sucesso!") : ResponseEntity.notFound().build();
    }
}
