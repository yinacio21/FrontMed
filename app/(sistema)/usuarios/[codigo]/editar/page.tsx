'use client'
import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../componentes/UsuarioForm";
import Link from "next/link";
import axios from "axios";

export default function EditarUsuario() {
  const params = useParams();
  const router = useRouter();
  const codigo = Number(params.codigo);

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    const user = await axios.get<Usuario>('http://localhost:8080/medicos/'+codigo)


    if (user.data) setUsuario(user.data);
    else router.push("/usuarios");
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Carregando Dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700 p-6 lg:p-12 relative overflow-hidden">
      
      {/* Leds Ambientais de Fundo */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-emerald-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header da Página */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <Link 
              href="/usuarios" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Voltar para lista
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Editar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Usuário</span>
            </h1>
            <p className="text-slate-500 font-medium border-l-4 border-blue-500/20 pl-4">
              Identificador do registro: <span className="text-blue-600 font-black">#{codigo}</span>
            </p>
          </div>

          {/* Badge de Status Cloud */}
          <div className="hidden md:flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
             <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Modo de Edição Seguro</span>
          </div>
        </div>

        {/* Container do Formulário */}
        <div className="relative group">
          {/* Efeito Glow atrás do formulário */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[40px] blur-2xl opacity-5 scale-[0.98] group-hover:opacity-10 transition-opacity" />
          
          <div className="relative bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-white p-8 lg:p-12">
            <div className="mb-10 flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Dados Cadastrais</h2>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Atualização em tempo real</p>
              </div>
            </div>

            {/* O Componente UsuarioForm precisará aceitar estilos internos ou ser estilizado separadamente para combinar perfeitamente */}
            <div className="relative z-10">
               <UsuarioForm usuarioExistente={usuario} />
            </div>
          </div>
        </div>

        {/* Footer de Segurança */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Proteção de dados AES-256 ativa</span>
        </div>

      </div>
    </div>
  );
}