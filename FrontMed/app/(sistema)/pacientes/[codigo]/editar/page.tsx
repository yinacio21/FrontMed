'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PacienteForm from "../../componentes/PacienteForm";
import { Paciente } from "@/app/types/pacientes";
import { buscarPacientePorId } from "@/app/services/pacienteService";
import PageHeader from "@/app/components/ui/PageHeader";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";

export default function EditarPaciente() {
  const params = useParams();
  const router = useRouter();
  const codigo = Number(params.codigo);
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    buscarPacientePorId(codigo)
      .then(p => { if (p) setPaciente(p); else router.push("/pacientes"); })
      .catch(() => router.push("/pacientes"));
  }, []);

  if (!paciente) return <LoadingSpinner fullScreen text="Carregando..." />;

  return (
    <div className="ms-page-shell">
      <PageHeader
        title={"Editar: " + paciente.nome}
        subtitle={"Registro #" + codigo}
        breadcrumbs={[{ label: "Pacientes", href: "/pacientes" }, { label: paciente.nome, href: "/pacientes/" + codigo }, { label: "Editar" }]}
      />
      <div className="ms-card p-6 lg:p-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-700 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Atualizar dados</h3>
            <p className="text-xs text-slate-400">Altere os campos necessarios e salve</p>
          </div>
        </div>
        <PacienteForm pacienteExistente={paciente} />
      </div>
    </div>
  );
}
