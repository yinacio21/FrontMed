"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import { useDispatch } from "react-redux"
import { hidratarAuth } from "./slices/authSlice"
import { store } from "./store"
import type { AppDispatch } from "./store"

function AuthHydrator({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(hidratarAuth());
    }, [dispatch]);

    return <>{children}</>;
}

export default function StoreProvider({children}: {children : React.ReactNode}){
    return (
        <Provider store={store}>
            <AuthHydrator>{children}</AuthHydrator>
        </Provider>
    )
}
