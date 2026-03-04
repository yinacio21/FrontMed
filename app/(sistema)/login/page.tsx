import React from 'react';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700 flex items-center justify-center relative overflow-hidden p-6 sm:p-12">
      
      {/* EFEITOS DE LUZ DE FUNDO (LEDS) - Mantidos para atmosfera */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-300/20 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-300/20 blur-[120px] rounded-full pointer-events-none" />

      {/* CARD DE LOGIN CENTRALIZADO E AMPLIFICADO */}
      <div className="relative z-10 w-full max-w-lg lg:max-w-xl">
        
        {/* Aura do Card - Reforçada para o tamanho maior */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[40px] blur-3xl opacity-20 translate-y-6 scale-95 pointer-events-none" />
        
        <div className="relative bg-white p-12 sm:p-16 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_0_1px_1px_rgba(0,0,0,0.02)] border border-white">
          
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.5)] mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Bem-vindo de volta</h1>
            <p className="text-slate-500 font-medium text-lg">Acesse sua clínica digitalmente.</p>
          </div>

          {/* Formulário */}
          <form className="space-y-8">
            <div className="space-y-3">
              <label className="text-base font-black text-slate-700 ml-1">E-mail Profissional</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <input 
                  type="email" 
                  placeholder="dr.nome@clinica.com"
                  className="w-full pl-14 pr-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-lg text-slate-700 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-base font-black text-slate-700">Senha</label>
                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-14 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-lg text-slate-700 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                  required
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-6 flex items-center justify-center gap-4 rounded-3xl bg-blue-600 px-10 py-6 text-xl font-bold text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.6)] active:scale-95 ring-2 ring-blue-400/20"
            >
              Entrar no Sistema
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>

          {/* Rodapé do Card */}
          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium text-lg">
              Ainda não possui acesso?{' '}
              <Link href="/registro" className="text-emerald-600 font-black hover:text-emerald-700 transition-colors underline decoration-2 underline-offset-4 decoration-emerald-600/30 hover:decoration-emerald-600">
                Criar Minha Conta
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}