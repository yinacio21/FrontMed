'use client'
import PacienteForm from "../componentes/PacienteForm";
import PageHeader from "@/app/components/ui/PageHeader";

export default function NovoPaciente() {
  return (
    <div className="ms-page-shell">
      <PageHeader
        title="Novo Paciente"
        subtitle="Preencha os dados para cadastrar um novo paciente"
        breadcrumbs={[{ label: "Pacientes", href: "/pacientes" }, { label: "Novo" }]}
      />
      <div className="ms-card p-6 lg:p-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-cyan-700/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6m-3-3h6"/></svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Dados do Paciente</h3>
            <p className="text-xs text-slate-400">Todos os campos marcados com * sao obrigatorios</p>
          </div>
        </div>
        <PacienteForm />
      </div>
    </div>
  );
}
