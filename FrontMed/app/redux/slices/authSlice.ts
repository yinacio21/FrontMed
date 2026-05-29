import { AuthState } from "@/app/types/auth";
import { Medico } from "@/app/types/medicos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: AuthState = {
    usuario: null,
    token: "",
    hidratado: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        hidratarAuth: (state) => {
            const usuarioRecover = Cookies.get('usuario');
            const tokenRecover = Cookies.get('token');

            state.token = tokenRecover ?? "";
            state.usuario = null;
            state.hidratado = true;

            if (!usuarioRecover) return;

            try {
                state.usuario = JSON.parse(usuarioRecover) as Medico;
            } catch {
                Cookies.remove('usuario');
            }
        },
        setToken: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            Cookies.set('token', action.payload.token, { expires: 7, secure: true });
        },
        setUsuario: (state, action: PayloadAction<{ usuario: Medico }>) => {
            state.usuario = action.payload.usuario;
            Cookies.set('usuario', JSON.stringify(action.payload.usuario), { expires: 7 });
        },
        logout: (state) => {
            state.token = "";
            state.usuario = null;
            state.hidratado = true;
            Cookies.remove('usuario');
            Cookies.remove('token');
        }
    }
});

export const { hidratarAuth, setToken, setUsuario, logout } = authSlice.actions;
export default authSlice.reducer;
