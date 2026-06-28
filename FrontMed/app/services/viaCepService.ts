import api from "./api";
import { ViaCepResponse } from "../types/viacep";

export async function buscarEnderecoPorCep(cep: string): Promise<ViaCepResponse | null> {
    const cepNumerico = cep.replace(/\D/g, "");

    if (cepNumerico.length !== 8) {
        return null;
    }

    try {
        const response = await api.get<{ cep: string; logradouro: string; bairro: string; cidade: string; uf: string }>(
            `/api/enderecos/${cepNumerico}`
        );

        const data = response.data;

        // Mapeia o formato do backend para o formato ViaCepResponse do frontend
        return {
            cep: data.cep,
            logradouro: data.logradouro,
            complemento: "",
            bairro: data.bairro,
            localidade: data.cidade,
            uf: data.uf,
            estado: "",
            ibge: "",
            ddd: "",
        };
    } catch {
        return null;
    }
}
