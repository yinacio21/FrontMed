import api from "./api";
import { Prontuario } from "../types/prontuarios";

export async function listarProntuariosPorPaciente(pacienteId: number): Promise<Prontuario[]> {
    const res = await api.get<Prontuario[]>(`/prontuarios/paciente/${pacienteId}`);
    return res.status === 200 ? res.data : [];
}

export async function buscarProntuarioPorId(id: number): Promise<Prontuario> {
    return (await api.get<Prontuario>(`/prontuarios/${id}`)).data;
}

export async function salvarProntuario(prontuario: { data: string; anotacoesClinicas: string; pacienteId: number }): Promise<number> {
    return (await api.post<number>('/prontuarios', prontuario)).data;
}

export async function deletarProntuario(id: number): Promise<boolean> {
    const res = await api.delete(`/prontuarios/${id}`);
    return res.status === 200;
}
