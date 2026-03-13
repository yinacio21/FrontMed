"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth, Usuario } from '../context/AuthContext';

export default function LoginPage() {

    const router  = useRouter();
    const {login} = useAuth();

    const handleLogin = async (FormData:FormData) => {
        const email = FormData.get("email");
        const senha = FormData.get("senha");


        try{

          //Validamos na API

          const usuarioMock = new Usuario(1,"Yasmin Inácio", "", true);
          const tokenmock = "jwt-sgdfhfudndfgf-sdfjshgsgsg"

          login(usuarioMock, tokenmock);

          

        }catch{
          alert("Erro ao entrar no sistema!")
        }


        console.log(`Autenticado com email: ${email}`)

        router.push("/dashboard")
    }
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">
      
      {/* EFEITOS DE LUZ (LED GLOW) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-100/40 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* CARD PRINCIPAL */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[45px] p-10 lg:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-white relative overflow-hidden">
          
          {/* Detalhe de iluminação superior */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-blue-600" />

          {/* LOGOTIPO */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Med<span className="text-blue-600">Flow</span>
            </h1>
            <div className="h-1 w-12 bg-slate-100 rounded-full" />
          </div>

          {/* FORMULÁRIO */}
          <form action = {handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
                Identificação de Acesso
              </label>
              <input
                name="email"
                type="email"
                placeholder="E-mail ou CPF"
                className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-semibold placeholder:text-slate-400 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
                Chave de Segurança
              </label>
              <input
                name="senha"
                type="password"
                placeholder="Sua senha"
                className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-semibold placeholder:text-slate-400 transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none shadow-sm"
              />
            </div>

            {/* BOTÃO ATUALIZADO (MENOR E ARREDONDADO) */}
            <button 
              type="submit"
              className="w-full group mt-4 flex items-center justify-center gap-2 rounded-full bg-slate-900 py-5 text-base font-bold text-white shadow-2xl transition-all hover:bg-blue-600 hover:-translate-y-1 active:scale-95"
            >
              Entrar no Sistema
              <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>

          {/* RODAPÉ TÉCNICO */}
          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                MedFlow Elite • {new Date().getFullYear()}
             </p>
          </div>
        </div>

        {/* TAG DE SEGURANÇA */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 bg-white/40 px-6 py-3 rounded-full border border-white/60 backdrop-blur-sm shadow-sm">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Ambiente Criptografado LGPD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}