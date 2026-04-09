package com.senac.backmed.BackMed.controllers;

import com.senac.backmed.BackMed.model.entities.Paciente;
import com.senac.backmed.BackMed.model.repository.PacienteRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(description = "Serviço responsavel por controlar o gerenciamento da entidade paciente!", name = "controller de pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    @Operation(description = "Lista todos os pacientes do sistema", summary = "listar todos os pacientes")
    public ResponseEntity<?> listarTodos() {
        var pacientes = pacienteRepository.findAll();
        return ResponseEntity.ok(pacientes);
    }

    @GetMapping("/{id}")
    @Operation(description = "busca um paciente no banco pelo ID", summary = "buscar paciente por ID")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pacienteRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(description = "cadastrar um novo paciente no sistema", summary = "cadastrar paciente")
    public ResponseEntity<Paciente> salvar(@RequestBody Paciente paciente) {
        return ResponseEntity.ok(pacienteRepository.save(paciente));
    }

    @PutMapping("/{id}")
    @Operation(description = "editar um paciente do sistema", summary = "editar paciente")
    public ResponseEntity<?> salvar(@PathVariable Long id, @RequestBody Paciente paciente) {

        var pacienteBanco = pacienteRepository.findById(id).orElse(null);

        if (pacienteBanco != null){
            pacienteBanco.setNome(paciente.getNome());
            pacienteBanco.setCpf(paciente.getCpf());
            pacienteBanco.setEstado(paciente.getEstado());
            pacienteBanco.setCidade(paciente.getCidade());

            pacienteRepository.save(pacienteBanco);

            return ResponseEntity.ok("Atualizado com Sucesso!");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(description = "excluir um paciente do sistema", summary = "excluir paciente")
    public ResponseEntity<?> deletar(@PathVariable Long id){
        var pacienteBanco = pacienteRepository.findById(id).orElse(null);

        if (pacienteBanco != null){
            pacienteRepository.delete(pacienteBanco);
        }
        return null;
    }
}
