package com.senac.backmed.application.services;


import com.senac.backmed.application.DTO.LoginRequest;
import com.senac.backmed.domain.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private MedicoRepository medicoRepository;

    public boolean ValidarUsuarioSenha(LoginRequest loginRequest){
        try{

            return medicoRepository.existsMedicoByEmailContainingAndSenha(loginRequest.email(), loginRequest.senha());

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
