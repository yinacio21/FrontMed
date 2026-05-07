package com.senac.backmed.presentation;

<<<<<<<< HEAD:BackMed/src/main/java/com/senac/backmed/BackMed/presentation/AuthController.java
import com.senac.backmed.application.DTO.LoginRequest;
import com.senac.backmed.application.DTO.LoginResponse;
import com.senac.backmed.application.services.TokenService;
import com.senac.backmed.application.services.UsuarioService;
========
import com.senac.backmed.BackMed.model.DTO.LoginRequest;
import com.senac.backmed.BackMed.model.DTO.LoginResponse;
import com.senac.backmed.BackMed.model.repository.MedicoRepository;
>>>>>>>> origin/main:BackMed/src/main/java/com/senac/backmed/BackMed/controllers/AuthController.java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(description = "Serviço responsável por controlar a autenticação de usuários e sessão!", name = "Serviço de Autenticação")
public class AuthController {

  @Autowired
  private  TokenService tokenService;

    @Autowired
<<<<<<<< HEAD:BackMed/src/main/java/com/senac/backmed/BackMed/presentation/AuthController.java
    private UsuarioService usuarioService;
========
    private MedicoRepository medicoRepository;
>>>>>>>> origin/main:BackMed/src/main/java/com/senac/backmed/BackMed/controllers/AuthController.java

    @PostMapping("/login")
    @Operation(description = "Valida senha (regra de negócio)", summary = "Login")
    public ResponseEntity<?> login (@RequestBody LoginRequest loginRequest){

        if (usuarioService.ValidarUsuarioSenha(loginRequest)){

            var token = tokenService.gerarToken(loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }
}
