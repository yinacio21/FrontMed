package com.senac.backmed.application.services;

import com.senac.backmed.application.DTO.PacienteRequest;
import com.senac.backmed.application.DTO.PacienteResponse;
import com.senac.backmed.domain.entities.Medico;
import com.senac.backmed.domain.entities.Paciente;
import com.senac.backmed.domain.repository.PacienteRepository;
import com.senac.backmed.domain.valueobjects.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    private Medico getMedicoLogado(Authentication authentication) {
        return (Medico) authentication.getPrincipal();
    }

    public List<PacienteResponse> listarTodos(Authentication authentication) {
        Medico medico = getMedicoLogado(authentication);
        return pacienteRepository.findByMedico_Id(medico.getId())
                .stream()
                .map(PacienteResponse::new)
                .collect(Collectors.toList());
    }

    public PacienteResponse buscarPorId(Long id, Authentication authentication) {
        Medico medico = getMedicoLogado(authentication);
        Paciente paciente = pacienteRepository.findById(id).orElse(null);
        if (paciente == null || !paciente.getMedico().getId().equals(medico.getId())) {
            return null;
        }
        return new PacienteResponse(paciente);
    }

    public Long salvarPaciente(PacienteRequest pacienteRequest, Authentication authentication) {
        String cpfNumerico = validarCPF(pacienteRequest.cpf());
        Medico medico = getMedicoLogado(authentication);
        validarCpfUnico(cpfNumerico, medico.getId());
        Paciente paciente = new Paciente();
        paciente.setNome(pacienteRequest.nome());
        paciente.setCpf(cpfNumerico);
        preencherEndereco(paciente, pacienteRequest);
        paciente.setEstado(pacienteRequest.estado());
        paciente.setCidade(pacienteRequest.cidade());
        paciente.setMedico(medico);
        return pacienteRepository.save(paciente).getId();
    }

    public boolean atualizarPaciente(Long id, PacienteRequest pacienteRequest, Authentication authentication) {
        String cpfNumerico = validarCPF(pacienteRequest.cpf());
        Medico medico = getMedicoLogado(authentication);
        validarCpfUnicoParaAtualizacao(cpfNumerico, medico.getId(), id);
        Paciente pacienteBanco = pacienteRepository.findById(id).orElse(null);
        if (pacienteBanco == null) return false;
        pacienteBanco.setNome(pacienteRequest.nome());
        pacienteBanco.setCpf(cpfNumerico);
        preencherEndereco(pacienteBanco, pacienteRequest);
        pacienteBanco.setEstado(pacienteRequest.estado());
        pacienteBanco.setCidade(pacienteRequest.cidade());
        pacienteRepository.save(pacienteBanco);
        return true;
    }

    private void preencherEndereco(Paciente paciente, PacienteRequest pacienteRequest) {
        paciente.setCep(pacienteRequest.cep());
        paciente.setLogradouro(pacienteRequest.logradouro());
        paciente.setNumero(pacienteRequest.numero());
        paciente.setComplemento(pacienteRequest.complemento());
        paciente.setBairro(pacienteRequest.bairro());
    }

    private String validarCPF(String cpf) {
        String cpfNumerico = cpf.replaceAll("[^0-9]", "");
        new CPF(cpfNumerico);
        return cpfNumerico;
    }

    private void validarCpfUnico(String cpf, Long medicoId) {
        if (pacienteRepository.existsByCpfAndMedico_Id(cpf, medicoId)) {
            throw new IllegalArgumentException("Ja existe um paciente cadastrado com este CPF para este medico.");
        }
    }

    private void validarCpfUnicoParaAtualizacao(String cpf, Long medicoId, Long id) {
        if (pacienteRepository.existsByCpfAndMedico_IdAndIdNot(cpf, medicoId, id)) {
            throw new IllegalArgumentException("Ja existe outro paciente cadastrado com este CPF para este medico.");
        }
    }

    public boolean deletarPaciente(Long id) {
        Paciente pacienteBanco = pacienteRepository.findById(id).orElse(null);
        if (pacienteBanco == null) return false;
        pacienteRepository.delete(pacienteBanco);
        return true;
    }
}
