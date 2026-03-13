'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Definição dos Ícones em SVG para evitar imports externos
  const Icons = {
    Dashboard: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="15" rx="1"/></svg>
    ),
    Patients: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    Settings: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    ),
    LogOut: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    ),
    Activity: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    ),
    Shield: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
    )
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Icons.Dashboard },
    { name: "Pacientes", href: "/usuarios", icon: Icons.Patients },
    { name: "Configurações", href: "/configuracoes", icon: Icons.Settings },
  ];

  return (
    <aside className="sticky top-0 h-screen w-72 bg-white text-slate-900 flex flex-col border-r border-slate-200/60 shrink-0 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.03)]">
      
      {/* 1. LOGO SECTION */}
      <div className="p-8 h-24 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]">
            <Icons.Activity />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            MediSys<span className="text-blue-600">.</span>
          </span>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          Menu Principal
        </p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100/50" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
              `}
            >
              <div className={`
                transition-all duration-300
                ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}
              `}>
                <item.icon />
              </div>
              
              <span className={`text-sm font-bold tracking-tight transition-colors ${isActive ? "text-blue-700" : "group-hover:text-slate-900"}`}>
                {item.name}
              </span>

              {isActive && (
                <div className="ml-auto w-1.5 h-6 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)] animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. SECURITY & FOOTER */}
      <div className="p-6 mt-auto">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-4 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            <Icons.Shield />
          </div>
          <div>
            <p className="text-[9px] font-black text-emerald-700 uppercase leading-none tracking-wider text-left">Cloud Ativo</p>
            <p className="text-[11px] font-bold text-emerald-600/80 text-left">LGPD Full Protection</p>
          </div>
        </div>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group">
          <Icons.LogOut />
          <span className="font-bold text-sm tracking-tight text-left">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
}