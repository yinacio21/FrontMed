'use client';

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { usePathname } from "next/navigation";

const PAGE_NAMES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/pacientes": "Pacientes",
  "/medicos": "Medicos",
  "/perfil": "Meu Perfil",
};

function getPageTitle(pathname: string): string {
  if (pathname.includes("/pacientes") && pathname.includes("/editar")) return "Editar Paciente";
  if (pathname.includes("/pacientes/novo")) return "Novo Paciente";
  if (pathname.includes("/pacientes/") && pathname.length > "/pacientes/".length) return "Detalhes do Paciente";
  if (pathname.includes("/medicos") && pathname.includes("/editar")) return "Editar Medico";
  if (pathname.includes("/medicos/novo")) return "Novo Medico";
  for (const [key, value] of Object.entries(PAGE_NAMES)) {
    if (pathname === key || pathname.startsWith(key + "/")) return value;
  }
  return "MediSys";
}

export default function Header() {
  const usuario = useSelector((state: RootState) => state.auth.usuario);
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const iniciais = usuario?.nome
    ? usuario.nome.split(" ").filter(Boolean).slice(0, 2).map(n => n[0]).join("").toUpperCase()
    : "M";

  return (
    <header className="h-20 bg-white/82 border-b border-slate-200/80 flex items-center justify-between px-6 sticky top-0 z-30 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div>
        <h2 className="text-lg font-black tracking-tight text-slate-900">{pageTitle}</h2>
        <p className="text-xs font-medium text-slate-400">MediSys — Gestao Clinica</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-700">Sistema online</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">{usuario?.nome || "Medico"}</p>
            <p className="text-xs text-cyan-700 font-bold mt-0.5">CRM {usuario?.crm || "—"}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-cyan-700/20">
            {iniciais}
          </div>
        </div>
      </div>
    </header>
  );
}
