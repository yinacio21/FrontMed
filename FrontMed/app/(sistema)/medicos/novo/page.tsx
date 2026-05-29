'use client'
import MedicoForm from "../componentes/MedicoForm";
import PageHeader from "@/app/components/ui/PageHeader";

export default function NovoMedico() {
  return (
    <div className="ms-page-shell">
      <PageHeader title="Novo Medico" subtitle="Preencha os dados para cadastrar um novo medico" breadcrumbs={[{ label: "Medicos", href: "/medicos" }, { label: "Novo" }]} />
      <div className="ms-card p-6 lg:p-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-cyan-700/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6M8 15v1a6 6 0 0 0 6 6M20 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/></svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Dados do Medico</h3>
            <p className="text-xs text-slate-400">Todos os campos marcados com * sao obrigatorios</p>
          </div>
        </div>
        <MedicoForm />
      </div>
    </div>
  );
}
