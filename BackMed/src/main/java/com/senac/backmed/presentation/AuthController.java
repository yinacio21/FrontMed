package com.senac.backmed.presentation;

import com.senac.backmed.application.DTO.LoginRequest;
import com.senac.backmed.application.DTO.LoginResponse;
import com.senac.backmed.application.services.MedicoService;
import com.senac.backmed.application.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Serviço de Autenticação", description = "Serviço responsável por controlar a autenticação de usuários e sessão!")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private MedicoService medicoService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Valida as credenciais e retorna o token JWT")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (medicoService.validarMedicoSenha(loginRequest)) {
            var token = tokenService.gerarToken(loginRequest.email());
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
