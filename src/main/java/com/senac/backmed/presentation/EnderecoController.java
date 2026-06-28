package com.senac.backmed.presentation;

import com.senac.backmed.application.DTO.EnderecoResponse;
import com.senac.backmed.application.services.EnderecoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {

    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<EnderecoResponse> buscarEndereco(@PathVariable String cep) {
        return ResponseEntity.ok(enderecoService.buscarEnderecoFormatado(cep));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleCepInvalido(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleErroComunicacao(RuntimeException e) {
        return ResponseEntity.internalServerError().body(e.getMessage());
    }
}
