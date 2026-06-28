'use client'
import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// Interceptor de Requisição: injeta o token JWT da store do Redux em toda requisição
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// Interceptor de Resposta: captura 401 (token expirado/inválido) e faz logout automático
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default api;
