package com.senac.backmed.presentation;

import com.senac.backmed.application.DTO.AlterarStatusRequest;
import com.senac.backmed.application.DTO.MedicoAdmRequest;
import com.senac.backmed.application.DTO.MedicoRequest;
import com.senac.backmed.application.DTO.MedicoResponde;
import com.senac.backmed.application.services.MedicoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "controller de medicos", description = "Serviço responsável por controlar o gerenciamento da entidade médico!")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @GetMapping("/usuariologado")
    @Operation(summary = "Consulta Médico Logado", description = "Busca o médico da sessão atual")
    public ResponseEntity<MedicoResponde> buscarMedicoLogado(Authentication authentication) {
        return ResponseEntity.ok(medicoService.buscarMedicoLogado(authentication));
    }

    @GetMapping
    @Operation(summary = "Listar todos os médicos", description = "Lista todos os médicos cadastrados no sistema")
    public ResponseEntity<List<MedicoResponde>> listarTodos() {
        return ResponseEntity.ok(medicoService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar médico por ID", description = "Busca um médico no banco pelo ID")
    public ResponseEntity<MedicoResponde> buscarPorId(@PathVariable Long id) {
        var medico = medicoService.buscarPorId(id);
        if (medico == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(medico);
    }

    @PostMapping
    @Operation(summary = "Cadastrar médico", description = "Cadastra um novo médico no sistema")
    public ResponseEntity<Long> salvar(@RequestBody MedicoRequest medicoRequest) {
        return ResponseEntity.ok(medicoService.salvarMedico(medicoRequest));
    }

    @PostMapping("/adm")
    @Operation(summary = "Cadastrar médico administrador", description = "Cadastra um novo médico com perfil de administrador")
    public ResponseEntity<Long> salvarAdm(@RequestBody MedicoAdmRequest medicoAdmRequest) {
        return ResponseEntity.ok(medicoService.salvarMedicoAdm(medicoAdmRequest));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar médico", description = "Edita os dados de um médico no sistema")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody MedicoRequest medicoRequest) {
        boolean atualizado = medicoService.atualizarMedico(id, medicoRequest);
        return atualizado ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(summary = "Alterar status do médico", description = "Ativa ou inativa um médico no sistema")
    public ResponseEntity<?> alterarStatus(@PathVariable Long id, @RequestBody AlterarStatusRequest statusRequest) {
        boolean atualizado = medicoService.alterarStatus(id, statusRequest);
        return atualizado ? ResponseEntity.ok("Status atualizado com sucesso!") : ResponseEntity.notFound().build();
    }
}
