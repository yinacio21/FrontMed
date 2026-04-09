package com.senac.backmed.BackMed.model.entities;

import com.senac.backmed.BackMed.model.enuns.StatusMedico;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "medico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String crm;

    private String especialidade;

    private String email;

    private String senha;

    private StatusMedico status = StatusMedico.ATIVO;

}
