package com.senac.backmed.domain.entities;

<<<<<<<< HEAD:BackMed/src/main/java/com/senac/backmed/BackMed/domain/entities/Paciente.java
========
import com.senac.backmed.BackMed.model.enuns.StatusMedico;
>>>>>>>> origin/main:BackMed/src/main/java/com/senac/backmed/BackMed/model/entities/Medico.java
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
<<<<<<<< HEAD:BackMed/src/main/java/com/senac/backmed/BackMed/domain/entities/Paciente.java
@Table(name = "paciente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {
========
@Table (name = "medico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medico {
>>>>>>>> origin/main:BackMed/src/main/java/com/senac/backmed/BackMed/model/entities/Medico.java

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

<<<<<<<< HEAD:BackMed/src/main/java/com/senac/backmed/BackMed/domain/entities/Paciente.java
    private String cpf;

    private String estado;
========
    private String crm;

    private String especialidade;

    private String email;

    private String senha;

    private StatusMedico status = StatusMedico.ATIVO;
>>>>>>>> origin/main:BackMed/src/main/java/com/senac/backmed/BackMed/model/entities/Medico.java

    private String cidade;
}
