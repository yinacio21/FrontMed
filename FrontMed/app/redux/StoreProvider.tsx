"use client"

import { useEffect, useRef } from "react"
import { Provider } from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import { hidratarAuth } from "./slices/authSlice"
import { inicializarUrgentes, filtrarUrgentes } from "./slices/prontuariosUrgentesSlice"
import { buscarProntuarioPorId } from "@/app/services/prontuarioService"
import { store } from "./store"
import type { AppDispatch, RootState } from "./store"

function AuthHydrator({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const usuario = useSelector((state: RootState) => state.auth.usuario);
    const medicoIdUrgentes = useSelector((state: RootState) => state.prontuariosUrgentes.medicoId);
    const urgentes = useSelector((state: RootState) => state.prontuariosUrgentes.itens);
    const validadoRef = useRef<number | null>(null);

    useEffect(() => {
        dispatch(hidratarAuth());
    }, [dispatch]);

    useEffect(() => {
        if (usuario?.id) {
            dispatch(inicializarUrgentes(usuario.id as number));
        }
    }, [usuario?.id, dispatch]);

    // Após carregar do cookie, valida cada prontuário contra a API.
    // IDs que não existem mais (banco resetado) são descartados do cookie.
    useEffect(() => {
        if (!medicoIdUrgentes || validadoRef.current === medicoIdUrgentes) return;

        validadoRef.current = medicoIdUrgentes;

        if (urgentes.length === 0) return;

        (async () => {
            const resultados = await Promise.allSettled(
                urgentes.map(item => buscarProntuarioPorId(item.id))
            );

            const idsValidos = urgentes
                .filter((_, i) => resultados[i].status === 'fulfilled')
                .map(p => p.id);

            if (idsValidos.length < urgentes.length) {
                dispatch(filtrarUrgentes(idsValidos));
            }
        })();
    // urgentes é capturado no momento em que medicoIdUrgentes muda (mesmo render do inicializarUrgentes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [medicoIdUrgentes, dispatch]);

    return <>{children}</>;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthHydrator>{children}</AuthHydrator>
        </Provider>
    );
}
