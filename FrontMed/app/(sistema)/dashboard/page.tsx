'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setDashboard } from '@/app/redux/slices/dashboardSlice';
import { marcarUrgente, desmarcarUrgente, limparUrgentes } from '@/app/redux/slices/prontuariosUrgentesSlice';
import { buscarDashboard } from '@/app/services/medicoService';
import Link from 'next/link';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { Prontuario } from '@/app/types/prontuarios';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const dash = useSelector((state: RootState) => state.dashboard);
  const usuario = useSelector((state: RootState) => state.auth.usuario);
  const urgentes = useSelector((state: RootState) => state.prontuariosUrgentes.itens);

  useEffect(() => {
    buscarDashboard().then(d => dispatch(setDashboard({
      medicoNome: d.medicoNome,
      medicoCrm: d.medicoCrm,
      medicoEspecialidade: d.medicoEspecialidade,
      totalPacientes: d.totalPacientes,
      ultimosProntuarios: d.ultimosProntuarios,
    }))).catch(console.error);
  }, [dispatch]);

  const nome = dash.medicoNome || usuario?.nome || "Medico";
  const crm = dash.medicoCrm || usuario?.crm || "—";
  const esp = dash.medicoEspecialidade || usuario?.especialidade || "—";

  const isUrgente = (id: number | null) => urgentes.some(u => u.id === id);

  const toggleUrgente = (p: Prontuario) => {
    if (isUrgente(p.id)) {
      dispatch(desmarcarUrgente(p.id as number));
    } else {
      dispatch(marcarUrgente(p));
    }
  };

  return (
    <div className="ms-page-shell space-y-8">

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bom dia, Dr. {nome.split(" ")[0]}</h1>
          <p className="text-sm text-slate-500 mt-1">Aqui esta o resumo da sua clinica hoje.</p>
        </div>
        <Link href="/pacientes/novo" className="ms-btn-primary flex-shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          Novo Paciente
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { label: "Pacientes cadastrados", value: dash.carregado ? String(dash.totalPacientes) : "—", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", color: "text-cyan-700 bg-cyan-50" },
          { label: "Ultimos registros", value: dash.carregado ? String(dash.ultimosProntuarios.length) : "—", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-teal-700 bg-teal-50" },
          { label: "Especialidade", value: esp.length > 12 ? esp.slice(0,12)+"..." : esp, icon: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4", color: "text-violet-600 bg-violet-50" },
          { label: "CRM ativo", value: crm, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "text-emerald-600 bg-emerald-50" },
        ].map((s, i) => (
          <div key={i} className="ms-card p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 " + s.color}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={s.icon}/></svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide truncate">{s.label}</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5 truncate">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Ultimos prontuarios */}
        <div className="lg:col-span-2 ms-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm">Ultimos Prontuarios</h3>
            <Link href="/pacientes" className="text-xs text-cyan-700 font-bold hover:underline">Ver pacientes</Link>
          </div>
          {!dash.carregado ? (
            <LoadingSpinner text="Carregando..." />
          ) : dash.ultimosProntuarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600">Nenhum prontuario ainda</p>
                <p className="text-xs text-slate-400 mt-0.5">Cadastre um paciente e registre o primeiro atendimento.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {dash.ultimosProntuarios.map(p => {
                const ini = (p.pacienteNome || "?").split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
                const data = p.data ? new Date(p.data + "T00:00:00").toLocaleDateString("pt-BR") : "—";
                const urgente = isUrgente(p.id);
                return (
                  <div key={p.id} className={"flex items-center gap-4 px-6 py-4 transition-colors " + (urgente ? "bg-amber-50/60" : "hover:bg-slate-50")}>
                    <div className={"w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 " + (urgente ? "bg-amber-100 text-amber-700" : "bg-cyan-50 text-cyan-700")}>
                      {ini}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{p.pacienteNome || "Paciente"}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{p.anotacoesClinicas?.slice(0, 60)}...</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-500">{data}</p>
                        <Link href={"/pacientes/" + p.pacienteId} className="text-xs text-cyan-700 font-bold hover:underline mt-0.5 block">Ver</Link>
                      </div>
                      <button
                        onClick={() => toggleUrgente(p)}
                        title={urgente ? "Remover urgencia" : "Marcar como urgente"}
                        className={"w-8 h-8 rounded-lg flex items-center justify-center transition-all " + (urgente
                          ? "bg-amber-500 text-white shadow-sm shadow-amber-200 hover:bg-amber-600"
                          : "bg-slate-100 text-slate-400 hover:bg-amber-100 hover:text-amber-600"
                        )}
                      >
                        <svg className="w-4 h-4" fill={urgente ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Coluna direita */}
        <div className="space-y-4">

          {/* Painel de Urgentes */}
          <div className="ms-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-amber-100 bg-amber-50/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-amber-900 text-sm">Urgentes</h3>
                {urgentes.length > 0 && (
                  <span className="text-xs font-bold bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {urgentes.length}
                  </span>
                )}
              </div>
              {urgentes.length > 0 && (
                <button
                  onClick={() => dispatch(limparUrgentes())}
                  className="text-xs text-amber-600 font-semibold hover:text-red-500 transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>

            {urgentes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2 text-center px-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-500">Nenhum urgente</p>
                <p className="text-xs text-slate-400">Clique no sino de um prontuario para marcar.</p>
              </div>
            ) : (
              <div className="divide-y divide-amber-50">
                {urgentes.map(u => {
                  const ini = (u.pacienteNome || "?").split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
                  const data = u.data ? new Date(u.data + "T00:00:00").toLocaleDateString("pt-BR") : "—";
                  return (
                    <div key={u.id} className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50/50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black flex-shrink-0">
                        {ini}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{u.pacienteNome || "Paciente"}</p>
                        <p className="text-xs text-slate-400 truncate">{data}</p>
                      </div>
                      <button
                        onClick={() => dispatch(desmarcarUrgente(u.id as number))}
                        className="w-6 h-6 rounded-md flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                        title="Remover"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Atalhos Rapidos */}
          <div className="ms-card p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Atalhos Rapidos</h3>
            <div className="space-y-2">
              {[
                { href: "/pacientes/novo", label: "Novo Paciente", desc: "Cadastrar novo paciente", color: "bg-cyan-700", icon: "M12 5v14M5 12h14" },
                { href: "/pacientes", label: "Ver Pacientes", desc: "Lista completa", color: "bg-teal-600", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0" },
                { href: "/medicos", label: "Gestao de Medicos", desc: "Contas do sistema", color: "bg-violet-600", icon: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6M8 15v1a6 6 0 0 0 6 6M20 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" },
              ].map(a => (
                <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className={"w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0 " + a.color}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={a.icon}/></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{a.label}</p>
                    <p className="text-xs text-slate-400">{a.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 shadow-[0_14px_34px_rgba(15,118,110,0.08)]">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <p className="text-sm font-bold text-emerald-800">Protecao ativa</p>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">Seus dados clinicos estao protegidos com acesso exclusivo por medico autenticado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
