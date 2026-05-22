'use client'
import Link from "next/link"
import UsuarioForm from "../componentes/UsuarioForm";

export default function CadastrarUsuario() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700 p-6 lg:p-12 relative overflow-hidden">
      
      {/* Luzes de Fundo (LED Blue Effect idêntico ao Editar) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-emerald-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header da Página */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Link 
              href="/usuarios" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Voltar para a listagem
            </Link>
            
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[0.9]">
              Novo <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-500 bg-clip-text text-transparent">Usuário</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-medium border-l-4 border-blue-500/20 pl-6">
              Inicie um novo registro na base de dados.
              Sua clínica 100% digital com segurança <span className="text-blue-600 font-bold">MedFlow</span>.
            </p>
          </div>

          {/* Badge de Status Cloud */}
          <div className="hidden md:flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] border border-white">
             <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
             </span>
             <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase tracking-[0.2em]">Sincronização Ativa</span>
          </div>
        </div>

        {/* Container Principal com Sombreado de Editar */}
        <div className="relative group">
          {/* Aura de LED (Mesmo efeito da página de edição) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[40px] blur-2xl opacity-20 -rotate-2 scale-105" />
          
          <div className="relative z-10 rounded-[40px] bg-white p-8 lg:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_0_1px_1px_rgba(0,0,0,0.02)] border border-white">
            
            {/* Título Interno com Ícone Blue-Style */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6m-3-3h6"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none">Dados Cadastrais</h3>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Iniciando novo registro</span>
              </div>
            </div>

            <UsuarioForm />
          </div>
        </div>

        {/* Tag de Segurança Flutuante (Repetindo o estilo da Landing Page) */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white shadow-sm transition-transform hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">LGPD Full Protection Ativa</p>
          </div>
        </div>

      </div>
    </div>
  );
}