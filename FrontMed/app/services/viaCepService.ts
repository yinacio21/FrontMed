import { ViaCepResponse } from "../types/viacep";

export async function buscarEnderecoPorCep(cep: string): Promise<ViaCepResponse | null> {
    const cepNumerico = cep.replace(/\D/g, "");

    if (cepNumerico.length !== 8) {
        return null;
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);

    if (!response.ok) {
        throw new Error("Nao foi possivel consultar o CEP.");
    }

    const data = await response.json() as ViaCepResponse;

    if (data.erro) {
        return null;
    }

    return data;
}
