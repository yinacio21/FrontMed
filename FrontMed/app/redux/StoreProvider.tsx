"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import { hidratarAuth } from "./slices/authSlice"
import { inicializarUrgentes } from "./slices/prontuariosUrgentesSlice"
import { store } from "./store"
import type { AppDispatch, RootState } from "./store"

function AuthHydrator({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const usuario = useSelector((state: RootState) => state.auth.usuario);

    useEffect(() => {
        dispatch(hidratarAuth());
    }, [dispatch]);

    useEffect(() => {
        if (usuario?.id) {
            dispatch(inicializarUrgentes(usuario.id as number));
        }
    }, [usuario?.id, dispatch]);

    return <>{children}</>;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthHydrator>{children}</AuthHydrator>
        </Provider>
    );
}
