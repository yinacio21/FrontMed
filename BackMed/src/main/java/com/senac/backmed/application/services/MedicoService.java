package com.senac.backmed.application.services;

import com.senac.backmed.application.DTO.*;
import com.senac.backmed.domain.entities.Medico;
import com.senac.backmed.domain.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Value("${spring.secretKey}")
    private String secret;

    public boolean validarMedicoSenha(LoginRequest loginRequest) {
        try {
            return medicoRepository.existsMedicoByEmailContainingAndSenha(loginRequest.email(), loginRequest.senha());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<MedicoResponde> listarTodos() {
        try {
            return medicoRepository.findAll()
                    .stream()
                    .map(MedicoResponde::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public MedicoResponde buscarMedicoLogado(Authentication authentication) {
        Medico medico = (Medico) authentication.getPrincipal();
        try {
            return medicoRepository.findById(medico.getId())
                    .map(MedicoResponde::new)
                    .orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public MedicoResponde buscarPorId(Long id) {
        try {
            return medicoRepository.findById(id)
                    .map(MedicoResponde::new)
                    .orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean atualizarMedico(Long id, MedicoRequest medicoRequest) {
        var medicoBanco = medicoRepository.findById(id).orElse(null);

        if (medicoBanco != null) {
            medicoBanco.setNome(medicoRequest.nome());
            medicoBanco.setCrm(medicoRequest.crm());
            medicoBanco.setEspecialidade(medicoRequest.especialidade());
            medicoBanco.setEmail(medicoRequest.email());
            medicoBanco.setSenha(medicoRequest.senha());
            medicoRepository.save(medicoBanco);
            return true;
        }
        return false;
    }

    public Long salvarMedico(MedicoRequest medicoRequest) {
        try {
            Medico medico = new Medico();
            medico.setNome(medicoRequest.nome());
            medico.setCrm(medicoRequest.crm());
            medico.setEspecialidade(medicoRequest.especialidade());
            medico.setEmail(medicoRequest.email());
            medico.setSenha(medicoRequest.senha());
            medico.setRole("ROLE_USER");
            return medicoRepository.save(medico).getId();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long salvarMedicoAdm(MedicoAdmRequest medicoAdmRequest) {
        try {
            if (medicoAdmRequest.secretKey().equals(secret)) {
                Medico medico = new Medico();
                medico.setNome(medicoAdmRequest.nome());
                medico.setCrm(medicoAdmRequest.crm());
                medico.setEspecialidade(medicoAdmRequest.especialidade());
                medico.setEmail(medicoAdmRequest.email());
                medico.setSenha(medicoAdmRequest.senha());
                medico.setRole("ROLE_ADMIN");
                return medicoRepository.save(medico).getId();
            }
            return 0L;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean alterarStatus(Long id, AlterarStatusRequest statusRequest) {
        var medicoBanco = medicoRepository.findById(id).orElse(null);

        if (medicoBanco != null) {
            medicoBanco.setStatus(statusRequest.status());
            medicoRepository.save(medicoBanco);
            return true;
        }
        return false;
    }
}
