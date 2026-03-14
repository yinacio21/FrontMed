'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const Icons = {
    // Ícone de Estetoscópio idêntico ao das suas imagens
    Logo: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
    ),
    Dashboard: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="15" rx="1"/></svg>
    ),
    Patients: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    LogOut: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    ),
    Shield: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
    )
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Icons.Dashboard },
    { name: "Pacientes", href: "/usuarios", icon: Icons.Patients },
  ];

  return (
    <aside className="sticky top-0 h-screen w-72 bg-white flex flex-col border-r border-slate-100 shrink-0 shadow-[10px_0_50px_-20px_rgba(0,0,0,0.05)]">
      
      {/* 1. LOGO SECTION - Com efeito de Brilho (Aura) igual à imagem */}
      <div className="p-8 h-28 flex items-center">
        <div className="flex items-center gap-4 group cursor-pointer relative">
          
          {/* Brilho de fundo da logo (Aura) */}
          <div className="absolute -left-2 w-16 h-16 bg-emerald-100/40 blur-xl rounded-full -z-10 animate-pulse" />
          
          {/* Container do Ícone com Sombra Suave */}
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-500 shadow-[0_8px_16px_-4px_rgba(16,185,129,0.2)] border border-emerald-50 group-hover:scale-105 transition-transform duration-500">
            <Icons.Logo />
          </div>

          {/* Nome MedFlow sem o management embaixo */}
          <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
            Med<span className="text-emerald-500">Flow</span>
          </span>
        </div>
      </div>

      {/* 2. NAVIGATION - Sem Configurações */}
      <nav className="flex-1 px-5 py-4 space-y-1.5">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">
          Menu Principal
        </p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex items-center gap-4 px-4 py-4 rounded-[20px] transition-all duration-300 group
                ${isActive 
                  ? "bg-slate-900 text-white shadow-[0_20px_30px_-10px_rgba(15,23,42,0.3)]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
              `}
            >
              <div className={`
                transition-all duration-300
                ${isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-blue-500"}
              `}>
                <item.icon />
              </div>
              
              <span className={`text-sm font-black tracking-tight transition-colors ${isActive ? "text-white" : "group-hover:text-slate-900"}`}>
                {item.name}
              </span>

              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. SECURITY & LOGOUT */}
      <div className="p-6 space-y-4">
        <div className="bg-slate-50 rounded-[24px] p-4 border border-slate-100 flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100">
            <Icons.Shield />
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Servidor</p>
            <p className="text-[11px] font-bold text-slate-700 truncate">Sincronizado via Cloud</p>
          </div>
        </div>

        <button className="flex items-center gap-3 w-full px-5 py-4 rounded-[20px] text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group font-black text-xs uppercase tracking-widest">
          <Icons.LogOut />
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
}