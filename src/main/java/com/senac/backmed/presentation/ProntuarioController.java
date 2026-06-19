package com.senac.backmed.presentation;

import com.senac.backmed.application.DTO.ProntuarioRequest;
import com.senac.backmed.application.DTO.ProntuarioResponse;
import com.senac.backmed.application.services.ProntuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prontuarios")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "controller de prontuarios", description = "Serviço responsável por controlar o gerenciamento da entidade prontuário!")
public class ProntuarioController {

    @Autowired
    private ProntuarioService prontuarioService;

    @GetMapping
    @Operation(summary = "Listar prontuários do médico logado", description = "Lista apenas os prontuários vinculados ao médico autenticado")
    public ResponseEntity<List<ProntuarioResponse>> listarTodos(Authentication authentication) {
        return ResponseEntity.ok(prontuarioService.listarTodos(authentication));
    }

    @GetMapping("/paciente/{pacienteId}")
    @Operation(summary = "Listar prontuários por paciente", description = "Retorna todos os prontuários de um paciente específico")
    public ResponseEntity<List<ProntuarioResponse>> listarPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(prontuarioService.listarPorPaciente(pacienteId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar prontuário por ID", description = "Busca um prontuário no banco pelo ID")
    public ResponseEntity<ProntuarioResponse> buscarPorId(@PathVariable Long id) {
        var prontuario = prontuarioService.buscarPorId(id);
        if (prontuario == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(prontuario);
    }

    @PostMapping
    @Operation(summary = "Cadastrar prontuário", description = "Cadastra um novo prontuário vinculado ao médico logado e ao paciente informado")
    public ResponseEntity<Long> salvar(@RequestBody ProntuarioRequest prontuarioRequest, Authentication authentication) {
        return ResponseEntity.ok(prontuarioService.salvarProntuario(prontuarioRequest, authentication));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar prontuário", description = "Edita os dados de um prontuário no sistema")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody ProntuarioRequest prontuarioRequest) {
        boolean atualizado = prontuarioService.atualizarProntuario(id, prontuarioRequest);
        return atualizado ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir prontuário", description = "Remove um prontuário do sistema")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        boolean deletado = prontuarioService.deletarProntuario(id);
        return deletado ? ResponseEntity.ok("Deletado com sucesso!") : ResponseEntity.notFound().build();
    }
}
