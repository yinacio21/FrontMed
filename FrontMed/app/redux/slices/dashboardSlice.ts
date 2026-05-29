import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prontuario } from "@/app/types/prontuarios";

interface DashboardState {
    medicoNome: string;
    medicoCrm: string;
    medicoEspecialidade: string;
    totalPacientes: number;
    ultimosProntuarios: Prontuario[];
    carregado: boolean;
}

const initialState: DashboardState = {
    medicoNome: '',
    medicoCrm: '',
    medicoEspecialidade: '',
    totalPacientes: 0,
    ultimosProntuarios: [],
    carregado: false,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboard: (state, action: PayloadAction<Omit<DashboardState, 'carregado'>>) => {
            state.medicoNome = action.payload.medicoNome;
            state.medicoCrm = action.payload.medicoCrm;
            state.medicoEspecialidade = action.payload.medicoEspecialidade;
            state.totalPacientes = action.payload.totalPacientes;
            state.ultimosProntuarios = action.payload.ultimosProntuarios;
            state.carregado = true;
        },
        limparDashboard: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setDashboard, limparDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
