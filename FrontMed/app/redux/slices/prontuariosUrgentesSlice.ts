import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Prontuario } from "@/app/types/prontuarios";
import { logout } from "./authSlice";

const cookieKey = (medicoId: number) => `medisys_urgentes_${medicoId}`;

function salvarNoCookie(medicoId: number | null, itens: Prontuario[]) {
    if (!medicoId) return;
    Cookies.set(cookieKey(medicoId), JSON.stringify(itens), { expires: 7 });
}

function carregarDoCookie(medicoId: number): Prontuario[] {
    try {
        const raw = Cookies.get(cookieKey(medicoId));
        const parsed = raw ? (JSON.parse(raw) as Prontuario[]) : [];
        return parsed.filter((p): p is Prontuario => p != null && typeof p.id === 'number');
    } catch { return []; }
}

interface ProntuariosUrgentesState {
    itens: Prontuario[];
    medicoId: number | null;
}

const initialState: ProntuariosUrgentesState = {
    itens: [],
    medicoId: null,
};

const prontuariosUrgentesSlice = createSlice({
    name: 'prontuariosUrgentes',
    initialState,
    reducers: {
        inicializarUrgentes: (state, action: PayloadAction<number>) => {
            state.medicoId = action.payload;
            state.itens = carregarDoCookie(action.payload);
        },
        marcarUrgente: (state, action: PayloadAction<Prontuario>) => {
            const jaExiste = state.itens.some(p => p.id === action.payload.id);
            if (!jaExiste) {
                state.itens.push(action.payload);
                salvarNoCookie(state.medicoId, [...state.itens]);
            }
        },
        desmarcarUrgente: (state, action: PayloadAction<number>) => {
            state.itens = state.itens.filter(p => p.id !== action.payload);
            salvarNoCookie(state.medicoId, [...state.itens]);
        },
        limparUrgentes: (state) => {
            state.itens = [];
            salvarNoCookie(state.medicoId, []);
        },
        filtrarUrgentes: (state, action: PayloadAction<number[]>) => {
            const idsValidos = new Set(action.payload);
            state.itens = state.itens.filter(p => p != null && idsValidos.has(p.id));
            salvarNoCookie(state.medicoId, [...state.itens]);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            // limpa Redux mas preserva o cookie — urgentes voltam no próximo login
            state.itens = [];
            state.medicoId = null;
        });
    },
});

export const { inicializarUrgentes, marcarUrgente, desmarcarUrgente, limparUrgentes, filtrarUrgentes } = prontuariosUrgentesSlice.actions;
export default prontuariosUrgentesSlice.reducer;
