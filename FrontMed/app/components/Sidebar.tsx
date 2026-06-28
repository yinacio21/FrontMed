'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";

const NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
        <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="15" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Pacientes",
    href: "/pacientes",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Médicos",
    href: "/medicos",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const usuario = useSelector((state: RootState) => state.auth.usuario);

  const iniciais = usuario?.nome
    ? usuario.nome.split(" ").filter(Boolean).slice(0, 2).map(n => n[0]).join("").toUpperCase()
    : "M";

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="sticky top-0 h-screen w-64 bg-[#07111f] flex flex-col border-r border-white/10 shrink-0 shadow-[18px_0_55px_rgba(15,23,42,0.18)]">

      {/* Logo */}
      <div className="h-20 flex items-center px-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
            <svg className="w-4.5 h-4.5 text-white" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Medi<span className="text-cyan-300">Sys</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1.5">
        <p className="px-3 mb-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.22em]">Menu</p>
        {NAV.map(item => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-bold transition-all duration-200 " +
                (active
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:bg-white/[0.07] hover:text-white")
              }
            >
              <span className={active ? "text-slate-950" : "text-slate-500"}>{item.icon}</span>
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-950" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.07] border border-white/10">
          <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 text-xs font-black flex-shrink-0">
            {iniciais}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{usuario?.nome || "Médico"}</p>
            <p className="text-[10px] text-slate-400 truncate">CRM {usuario?.crm || "—"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm font-bold"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sair da conta
        </button>
      </div>
    </aside>
  );
}
