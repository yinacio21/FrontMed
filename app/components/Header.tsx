'use client'
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { usuario, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f0f4f8]/80 backdrop-blur-xl border-b border-slate-200/50">
      {/* Usando w-full e justify-between para garantir que o flex ocupe o espaço e empurre o conteúdo */}
      <div className="flex h-20 w-full items-center px-8">
        
        {/* Este div vazio com flex-1 empurra o próximo elemento para a direita */}
        <div className="flex-1" />

        {/* Container de Informações - Agora forçado para a DIREITA pelo flex-1 acima */}
        <div className="flex items-center gap-6">
          
          {/* Área do Perfil */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-slate-900 tracking-tight leading-none">
                {usuario?.nome.toLocaleUpperCase() || 'PROFISSIONAL'}
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                  CRM 12345
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
              </div>
            </div>

            {/* Avatar Placeholder */}
            <div className="relative group cursor-pointer">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-400 group-hover:border-blue-400 transition-all duration-300">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            </div>
          </div>

          {/* Divisor */}
          <div className="h-8 w-px bg-slate-200" />

          {/* Botão Sair */}
          <button 
            onClick={logout}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-black text-[10px] uppercase tracking-widest"
          >
            <span className="hidden sm:inline">Sair</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
        
      </div>
    </header>
  );
}