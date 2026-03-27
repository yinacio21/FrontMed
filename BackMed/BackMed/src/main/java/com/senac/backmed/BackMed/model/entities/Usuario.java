package com.senac.backmed.BackMed.model.entities;

import com.senac.backmed.BackMed.model.enuns.EnumStatusUsuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

}
