package com.senac.backmed.BackMed.controllers;

import com.senac.backmed.BackMed.model.DTO.LoginRequest;
import com.senac.backmed.BackMed.model.DTO.LoginResponse;
import com.senac.backmed.BackMed.model.entities.Usuario;
import com.senac.backmed.BackMed.model.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@Tag(description = "Serviço responsável por controlar a autenticação de usuários e sessão!", name = "Serviço de Autenticação")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    @Operation(description = "Valida senha (regra de negócio)", summary = "Login")
    public ResponseEntity<?> login (@RequestBody LoginRequest loginRequest){

        Optional<Usuario> usuario = usuarioRepository.findByEmail(loginRequest.email());

        if (usuario.isPresent() && usuario.get().getSenha().equals(loginRequest.senha())){
            return ResponseEntity.ok(new LoginResponse("DFHGDFGDG"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }
}
