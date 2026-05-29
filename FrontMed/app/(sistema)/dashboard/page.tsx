'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setDashboard } from '@/app/redux/slices/dashboardSlice';
import { buscarDashboard } from '@/app/services/medicoService';
import Link from 'next/link';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const dash = useSelector((state: RootState) => state.dashboard);
  const usuario = useSelector((state: RootState) => state.auth.usuario);

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

  return (
    <div className="ms-page-shell space-y-8">

      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bom dia, Dr. {nome.split(" ")[0]}</h1>
          <p className="text-sm text-slate-500 mt-1">Aqui esta o resumo da sua clinica hoje.</p>
        </div>
        <Link
          href="/pacientes/novo"
          className="ms-btn-primary flex-shrink-0"
        >
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
                return (
                  <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center text-xs font-black flex-shrink-0">{ini}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{p.pacienteNome || "Paciente"}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{p.anotacoesClinicas?.slice(0, 60)}...</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-medium text-slate-500">{data}</p>
                      <Link href={"/pacientes/" + p.pacienteId} className="text-xs text-cyan-700 font-bold hover:underline mt-0.5 block">Ver</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Atalhos */}
        <div className="space-y-4">
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
