export interface Prontuario {
    id: number | null;
    data: string;
    anotacoesClinicas: string;
    pacienteId: number;
    pacienteNome?: string | null;
    medicoId?: number | null;
    medicoNome?: string | null;
}

export interface ProntuarioFormProps {
    pacienteId: number;
    onSalvo: () => void;
}
