package com.senac.backmed.BackMed.model.DTO;

import com.senac.backmed.BackMed.model.enuns.EnumStatusUsuario;

public record AlterarStatusRequest(EnumStatusUsuario status) {
}
