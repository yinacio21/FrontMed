'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Badge from "@/app/components/ui/Badge";
import PageHeader from "@/app/components/ui/PageHeader";

export default function Perfil() {
  const usuario = useSelector((state: RootState) => state.auth.usuario);
  const iniciais = usuario?.nome
    ? usuario.nome.split(" ").filter(Boolean).slice(0,2).map(n => n[0]).join("").toUpperCase()
    : "M";

  return (
    <div className="ms-page-shell">
      <PageHeader title="Meu Perfil" subtitle="Informacoes da sua conta no MediSys" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de identidade */}
        <div className="ms-card p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white text-2xl font-black mb-4 shadow-lg shadow-cyan-700/25">{iniciais}</div>
          <h2 className="text-lg font-bold text-slate-900">{usuario?.nome || "Medico"}</h2>
          <p className="text-sm text-slate-500 mt-1">{usuario?.especialidade || "Especialidade nao informada"}</p>
          <div className="mt-4 w-full space-y-3">
            <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">CRM</span>
              <span className="text-sm font-bold text-slate-700">{usuario?.crm || "—"}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</span>
              <Badge variant="success" dot>Ativo</Badge>
            </div>
          </div>
        </div>

        {/* Dados da conta */}
        <div className="lg:col-span-2 ms-card p-6">
          <h3 className="text-base font-bold text-slate-800 mb-5 pb-4 border-b border-slate-100">Dados da Conta</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Nome completo", value: usuario?.nome || "—" },
              { label: "E-mail", value: usuario?.email || "—" },
              { label: "CRM", value: usuario?.crm || "—" },
              { label: "Especialidade", value: usuario?.especialidade || "—" },
            ].map(item => (
              <div key={item.label}>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">{item.label}</label>
                <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800">Conta protegida</p>
                <p className="text-xs text-emerald-700">Seus dados clinicos sao acessiveis apenas pela sua conta autenticada.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
