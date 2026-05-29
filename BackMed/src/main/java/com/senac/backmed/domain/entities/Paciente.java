package com.senac.backmed.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "paciente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    private String cep;

    private String logradouro;

    private String numero;

    private String complemento;

    private String bairro;

    private String estado;

    private String cidade;

    private String email;

    private String senha;

    @ManyToOne
    @JoinColumn(name = "medico_id")
    private Medico medico;
}
