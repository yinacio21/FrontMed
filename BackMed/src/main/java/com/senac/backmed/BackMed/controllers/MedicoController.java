package com.senac.backmed.BackMed.controllers;

import com.senac.backmed.BackMed.model.DTO.AlterarStatusRequest;
import com.senac.backmed.BackMed.model.entities.Medico;
import com.senac.backmed.BackMed.model.repository.MedicoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/medicos")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(description = "Serviço responsavel por controlar o gerenciamento da entidade medico!", name = "controller de medicos")
public class MedicoController {

    @Autowired
    private MedicoRepository medicoRepository;


    @GetMapping
    @Operation(description = "lista todos os medicos", summary = "listar todos os medicos")
    public ResponseEntity<?> listarTodos() {
        var medicos = medicoRepository.findAll();
        return ResponseEntity.ok(medicos);
    }

    @GetMapping("/{id}")
    @Operation(description = "busca um medico no banco pelo ID", summary = "buscar medico por ID")
    public ResponseEntity<Medico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(medicoRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(description = "cadastrar um novo medico no sistema", summary = "cadastrar medico")
    public ResponseEntity<Medico> salvar(@RequestBody Medico medico) {

        return ResponseEntity.ok(medicoRepository.save(medico));
    }

    @PutMapping("/{id}")
    @Operation(description = "editar um medico do sistema", summary = "editar medico")
    public ResponseEntity<?> salvar(@PathVariable Long id, @RequestBody Medico medico) {

        var medicoBanco = medicoRepository.findById(id).orElse(null);

        if (medicoBanco != null){
            medicoBanco.setNome(medico.getNome());
            medicoBanco.setCrm(medico.getCrm());
            medicoBanco.setEspecialidade(medico.getEspecialidade());
            medicoBanco.setEmail(medico.getEmail());
            medicoBanco.setSenha(medico.getSenha());

            medicoRepository.save(medicoBanco);

            return ResponseEntity.ok("Atualizado com Sucesso!");
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "editar o status de um medico no sistema", summary = "editar status do medico")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusRequest statusRequest){

        var medicoBanco = medicoRepository.findById(id).orElse(null);

        if (medicoBanco != null){

            medicoBanco.setStatus(statusRequest.status());
            medicoRepository.save(medicoBanco);
            return ResponseEntity.ok("Atualizado com Sucesso!");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(description = "excluir um medico do sistema", summary = "excluir medico")
    public ResponseEntity<?> deletar(@PathVariable Long id){
        var medicoBanco = medicoRepository.findById(id).orElse(null);

        if (medicoBanco != null){
            medicoRepository.delete(medicoBanco);
        }
        return null;
    }
}
