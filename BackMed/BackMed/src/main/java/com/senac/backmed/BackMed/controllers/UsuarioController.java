package com.senac.backmed.BackMed.controllers;


import com.senac.backmed.BackMed.model.DTO.AlterarStatusRequest;
import com.senac.backmed.BackMed.model.entities.Usuario;
import com.senac.backmed.BackMed.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping
    public ResponseEntity<?> listarTodos() {
        var usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok(usuarios);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioRepository.findById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> salvar(@PathVariable Long id, @RequestBody Usuario usuario) {

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null){
            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setNome(usuario.getNome());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());

            usuarioRepository.save(usuarioBanco);

            return ResponseEntity.ok("Atualizado com Sucesso!");
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusRequest statusRequest){

        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null){

            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok("Atualizado com Sucesso!");
        }
        return ResponseEntity.notFound().build();
    }
}
