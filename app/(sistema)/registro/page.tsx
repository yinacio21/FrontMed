import React from 'react';
import Link from 'next/link';

export default function Registro() {
  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700 flex items-center justify-center relative overflow-hidden p-6">
      
      {/* EFEITOS DE LUZ DE FUNDO */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-300/20 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-300/20 blur-[120px] rounded-full pointer-events-none" />

      {/* CARD DE REGISTRO */}
      <div className="relative z-10 w-full max-w-2xl">
        
        {/* Aura do Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[40px] blur-3xl opacity-20 translate-y-6 scale-95 pointer-events-none" />
        
        <div className="relative bg-white p-10 sm:p-14 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-white">
          
          {/* Cabeçalho */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 rounded-xl">
              Nova Conta
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Sua clínica <span className="text-blue-600">digital.</span></h1>
            <p className="text-slate-500 font-medium">Preencha os dados para começar.</p>
          </div>

          {/* Formulário com Grid */}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Nome Completo - Ocupa toda a largura */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: Dr. Ricardo Silva"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-base text-slate-700 font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                required
              />
            </div>

            {/* E-mail */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">E-mail Profissional</label>
              <input 
                type="email" 
                placeholder="seu@email.com"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-base text-slate-700 font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                required
              />
            </div>

            {/* CRM */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">CRM / Registro</label>
              <input 
                type="text" 
                placeholder="000000-UF"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-base text-slate-700 font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                required
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">Senha</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-base text-slate-700 font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                required
              />
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">Confirmar Senha</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-base text-slate-700 font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                required
              />
            </div>

            {/* Botão de Cadastro */}
            <div className="sm:col-span-2 pt-4">
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-5 text-lg font-bold text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95 ring-2 ring-blue-400/20"
              >
                Criar Minha Conta
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </form>

          {/* Rodapé */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-blue-600 font-black hover:text-blue-700 transition-colors underline decoration-2 underline-offset-4 decoration-blue-600/30">
                Fazer Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}