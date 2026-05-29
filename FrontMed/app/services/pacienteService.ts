import api from "./api";
import { Paciente } from "../types/pacientes";

export async function listarPacientes(): Promise<Paciente[]> {
    const res = await api.get<Paciente[]>('/pacientes');
    return res.status === 200 ? res.data : [];
}

export async function buscarPacientePorId(id: number): Promise<Paciente> {
    return (await api.get<Paciente>(`/pacientes/${id}`)).data;
}

export async function salvarPaciente(paciente: Omit<Paciente, 'id' | 'medicoId' | 'medicoNome'>): Promise<number> {
    return (await api.post<number>('/pacientes', paciente)).data;
}

export async function atualizarPaciente(id: number, paciente: Omit<Paciente, 'id' | 'medicoId' | 'medicoNome'>): Promise<boolean> {
    const res = await api.put(`/pacientes/${id}`, paciente);
    return res.status === 200;
}

export async function deletarPaciente(id: number): Promise<boolean> {
    const res = await api.delete(`/pacientes/${id}`);
    return res.status === 200;
}
