package com.senac.backmed.BackMed.controllers;

import com.senac.backmed.BackMed.model.entities.Prontuario;
import com.senac.backmed.BackMed.model.repository.ProntuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/prontuarios")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(description = "Serviço responsavel por controlar o gerenciamento da entidade prontuario!", name = "controller de prontuarios")
public class ProntuarioController {

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    @GetMapping
    @Operation(description = "Lista todos os prontuarios do sistema", summary = "listar todos os prontuarios")
    public ResponseEntity<?> listarTodos() {
        var prontuarios = prontuarioRepository.findAll();
        return ResponseEntity.ok(prontuarios);
    }

    @GetMapping("/{id}")
    @Operation(description = "busca um prontuario no banco pelo ID", summary = "buscar prontuario por ID")
    public ResponseEntity<Prontuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(prontuarioRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(description = "cadastrar um novo prontuario no sistema", summary = "cadastrar prontuario")
    public ResponseEntity<Prontuario> salvar(@RequestBody Prontuario prontuario) {
        return ResponseEntity.ok(prontuarioRepository.save(prontuario));
    }

    @PutMapping("/{id}")
    @Operation(description = "editar um prontuario do sistema", summary = "editar prontuario")
    public ResponseEntity<?> salvar(@PathVariable Long id, @RequestBody Prontuario prontuario) {

        var prontuarioBanco = prontuarioRepository.findById(id).orElse(null);

        if (prontuarioBanco != null){
            prontuarioBanco.setData(prontuario.getData());
            prontuarioBanco.setAnotacoesClinicas(prontuario.getAnotacoesClinicas());
            prontuarioBanco.setPaciente(prontuario.getPaciente());

            prontuarioRepository.save(prontuarioBanco);

            return ResponseEntity.ok("Atualizado com Sucesso!");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(description = "excluir um prontuario do sistema", summary = "excluir prontuario")
    public ResponseEntity<?> deletar(@PathVariable Long id){
        var prontuarioBanco = prontuarioRepository.findById(id).orElse(null);

        if (prontuarioBanco != null){
            prontuarioRepository.delete(prontuarioBanco);
        }
        return null;
    }

















}
