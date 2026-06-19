package com.senac.backmed.application.services;

import com.senac.backmed.application.DTO.ProntuarioRequest;
import com.senac.backmed.application.DTO.ProntuarioResponse;
import com.senac.backmed.domain.entities.Medico;
import com.senac.backmed.domain.entities.Prontuario;
import com.senac.backmed.domain.repository.PacienteRepository;
import com.senac.backmed.domain.repository.ProntuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProntuarioService {

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    private Medico getMedicoLogado(Authentication authentication) {
        return (Medico) authentication.getPrincipal();
    }

    public List<ProntuarioResponse> listarTodos(Authentication authentication) {
        Medico medico = getMedicoLogado(authentication);
        return prontuarioRepository.findByMedico_Id(medico.getId())
                .stream()
                .map(ProntuarioResponse::new)
                .collect(Collectors.toList());
    }

    public List<ProntuarioResponse> listarPorPaciente(Long pacienteId) {
        return prontuarioRepository.findByPaciente_Id(pacienteId)
                .stream()
                .map(ProntuarioResponse::new)
                .collect(Collectors.toList());
    }

    public ProntuarioResponse buscarPorId(Long id) {
        return prontuarioRepository.findById(id)
                .map(ProntuarioResponse::new)
                .orElse(null);
    }

    public Long salvarProntuario(ProntuarioRequest prontuarioRequest, Authentication authentication) {
        Medico medico = getMedicoLogado(authentication);
        var paciente = pacienteRepository.findById(prontuarioRequest.pacienteId()).orElse(null);
        Prontuario prontuario = new Prontuario();
        prontuario.setData(prontuarioRequest.data());
        prontuario.setAnotacoesClinicas(prontuarioRequest.anotacoesClinicas());
        prontuario.setPaciente(paciente);
        prontuario.setMedico(medico);
        return prontuarioRepository.save(prontuario).getId();
    }

    public boolean atualizarProntuario(Long id, ProntuarioRequest prontuarioRequest) {
        Prontuario prontuarioBanco = prontuarioRepository.findById(id).orElse(null);
        if (prontuarioBanco == null) return false;
        var paciente = pacienteRepository.findById(prontuarioRequest.pacienteId()).orElse(null);
        prontuarioBanco.setData(prontuarioRequest.data());
        prontuarioBanco.setAnotacoesClinicas(prontuarioRequest.anotacoesClinicas());
        prontuarioBanco.setPaciente(paciente);
        prontuarioRepository.save(prontuarioBanco);
        return true;
    }

    public boolean deletarProntuario(Long id) {
        Prontuario prontuarioBanco = prontuarioRepository.findById(id).orElse(null);
        if (prontuarioBanco == null) return false;
        prontuarioRepository.delete(prontuarioBanco);
        return true;
    }
}
