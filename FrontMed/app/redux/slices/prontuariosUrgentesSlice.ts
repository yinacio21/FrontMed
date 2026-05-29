import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prontuario } from "@/app/types/prontuarios";

interface ProntuariosUrgentesState {
    itens: Prontuario[];
}

const initialState: ProntuariosUrgentesState = {
    itens: [],
};

const prontuariosUrgentesSlice = createSlice({
    name: 'prontuariosUrgentes',
    initialState,
    reducers: {
        marcarUrgente: (state, action: PayloadAction<Prontuario>) => {
            const jaExiste = state.itens.some(p => p.id === action.payload.id);
            if (!jaExiste) {
                state.itens.push(action.payload);
            }
        },
        desmarcarUrgente: (state, action: PayloadAction<number>) => {
            state.itens = state.itens.filter(p => p.id !== action.payload);
        },
        limparUrgentes: (state) => {
            state.itens = [];
        },
    },
});

export const { marcarUrgente, desmarcarUrgente, limparUrgentes } = prontuariosUrgentesSlice.actions;
export default prontuariosUrgentesSlice.reducer;
