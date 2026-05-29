import { Medico } from "./medicos";

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token: string;
}

export interface AuthState {
    usuario: Medico | null;
    token: string;
    hidratado: boolean;
}
