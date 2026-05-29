'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Paciente } from "@/app/types/pacientes";
import { Prontuario } from "@/app/types/prontuarios";
import { buscarPacientePorId } from "@/app/services/pacienteService";
import { listarProntuariosPorPaciente, deletarProntuario } from "@/app/services/prontuarioService";
import ProntuarioForm from "./componentes/ProntuarioForm";
import ProntuarioTimeline from "./componentes/ProntuarioTimeline";
import Modal, { useModal } from "@/app/components/ui/Modal";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import PageHeader from "@/app/components/ui/PageHeader";

function formatarCPF(cpf: string): string {
  const n = cpf.replace(/\D/g, "").slice(0, 11);
  if (n.length !== 11) return cpf;
  return n.slice(0, 3) + "." + n.slice(3, 6) + "." + n.slice(6, 9) + "-" + n.slice(9);
}

export default function DetalhesPaciente() {
  const params = useParams();
  const router = useRouter();
  const codigo = Number(params.codigo);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { modal, closeModal, showError, showConfirm } = useModal();

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    setCarregando(true);
    try {
      const [p, prts] = await Promise.all([buscarPacientePorId(codigo), listarProntuariosPorPaciente(codigo)]);
      if (!p) { router.push("/pacientes"); return; }
      setPaciente(p);
      setProntuarios(prts);
    } catch { router.push("/pacientes"); }
    finally { setCarregando(false); }
  };

  const recarregar = async () => {
    try { setProntuarios(await listarProntuariosPorPaciente(codigo)); }
    catch { showError("Erro", "Nao foi possivel recarregar os prontuarios."); }
  };

  const handleDeletar = (id: number) => {
    showConfirm(
      "Excluir prontuario",
      "Tem certeza que deseja excluir este registro? Esta acao nao pode ser desfeita.",
      async () => {
        try { await deletarProntuario(id); await recarregar(); }
        catch { showError("Erro", "Nao foi possivel excluir o prontuario."); }
      },
      { confirmLabel: "Sim, excluir" }
    );
  };

  if (carregando) return <LoadingSpinner fullScreen text="Carregando paciente..." />;
  if (!paciente) return null;

  const iniciais = paciente.nome.split(" ").filter(Boolean).slice(0,2).map(n => n[0]).join("").toUpperCase();
  const enderecoLinha1 = [paciente.logradouro, paciente.numero].filter(Boolean).join(", ");
  const enderecoLinha2 = [paciente.bairro, paciente.cidade, paciente.estado].filter(Boolean).join(" - ");

  return (
    <div className="ms-page-shell space-y-6">
      <PageHeader
        title={paciente.nome}
        breadcrumbs={[{ label: "Pacientes", href: "/pacientes" }, { label: paciente.nome }]}
        action={
          <Link href={"/pacientes/" + codigo + "/editar"} className="ms-btn-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar paciente
          </Link>
        }
      />

      {/* Patient card */}
      <div className="ms-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white text-xl font-black flex-shrink-0 shadow-md shadow-cyan-700/25">{iniciais}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900">{paciente.nome}</h2>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10M7 12h5"/></svg>
                CPF: {formatarCPF(paciente.cpf)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {enderecoLinha2 || paciente.cidade + " - " + paciente.estado}
              </span>
              {paciente.medicoNome && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Dr(a). {paciente.medicoNome}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-lg">
                {prontuarios.length} {prontuarios.length === 1 ? "prontuario" : "prontuarios"}
              </span>
            </div>
            {(enderecoLinha1 || paciente.cep || paciente.complemento) && (
              <div className="mt-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-700">{enderecoLinha1}</p>
                {paciente.complemento && <p>{paciente.complemento}</p>}
                <p>{enderecoLinha2}{paciente.cep ? " | CEP: " + paciente.cep : ""}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content: Form + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <ProntuarioForm pacienteId={codigo} onSalvo={recarregar} />
        </div>
        <div className="lg:col-span-3">
          <ProntuarioTimeline prontuarios={prontuarios} onDeletar={handleDeletar} />
        </div>
      </div>

      <Modal {...modal} onClose={closeModal} />
    </div>
  );
}
