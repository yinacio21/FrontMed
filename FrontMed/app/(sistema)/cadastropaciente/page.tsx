'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroPaciente() {
    const router = useRouter();
    useEffect(() => { router.replace('/pacientes/novo'); }, [router]);
    return null;
}