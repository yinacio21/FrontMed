export interface Paciente {
    id: number | null;
    nome: string;
    cpf: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    estado: string;
    cidade: string;
    medicoId?: number | null;
    medicoNome?: string | null;
}

export interface PacienteFormProps {
    pacienteExistente?: Paciente;
}
