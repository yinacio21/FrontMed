'use client'
import { Medico } from "../types/medicos";
import { Prontuario } from "../types/prontuarios";
import api from "./api";

export interface DashboardData {
    medicoNome: string;
    medicoCrm: string;
    medicoEspecialidade: string;
    totalPacientes: number;
    ultimosProntuarios: Prontuario[];
}

export async function buscarDashboard(): Promise<DashboardData> {
    return (await api.get<DashboardData>('/dashboard')).data;
}

export async function buscarListaMedicos(): Promise<Medico[]> {
    const dados = await api.get<Medico[]>('/medicos');
    if (dados.status === 200) {
        return dados.data;
    }
    return [];
}

export async function buscarPorId(codigo: number): Promise<Medico> {
    return (await api.get<Medico>('/medicos/' + codigo)).data;
}

export async function buscarMedicoLogado(): Promise<Medico> {
    return (await api.get<Medico>('/medicos/usuariologado')).data;
}

export async function salvar(medico: Medico): Promise<number> {
    const dadosResult = await api.post<number>('/medicos', medico);
    return dadosResult.data;
}

export async function atualizar(medico: Medico): Promise<number> {
    const dadosResult = await api.put<number>('/medicos/' + medico.id, medico);
    return dadosResult.data;
}

export async function alterarStatusMedico(medico: Medico): Promise<void> {
    const novoStatus = medico.status === "ATIVO" ? { status: "INATIVO" } : { status: "ATIVO" };
    const dadosResult = await api.put<number>('/medicos/' + medico.id + '/AlterarStatus', novoStatus);
    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar status!");
    }
}
