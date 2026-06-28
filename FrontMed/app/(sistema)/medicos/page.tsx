'use client'
import { useEffect, useState } from "react";
import { buscarListaMedicos, alterarStatusMedico } from "@/app/services/medicoService";
import { Medico } from "@/app/types/medicos";
import Link from "next/link";
import Modal, { useModal } from "@/app/components/ui/Modal";
import Badge from "@/app/components/ui/Badge";
import EmptyState from "@/app/components/ui/EmptyState";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import PageHeader from "@/app/components/ui/PageHeader";

export default function Medicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { modal, closeModal, showError, showConfirm } = useModal();

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    setCarregando(true);
    try { setMedicos(await buscarListaMedicos()); }
    catch { showError("Erro", "Não foi possível carregar a lista de médicos."); }
    finally { setCarregando(false); }
  };

  const confirmarAlterarStatus = (m: Medico) => {
    const acao = m.status === "ATIVO" ? "inativar" : "ativar";
    showConfirm(
      "Alterar status",
      "Deseja " + acao + " o médico " + m.nome + "?",
      async () => {
        try { await alterarStatusMedico(m); await carregar(); }
        catch { showError("Erro", "Não foi possível alterar o status."); }
      },
      { confirmLabel: acao.charAt(0).toUpperCase() + acao.slice(1) }
    );
  };

  return (
    <div className="ms-page-shell">
      <PageHeader
        title="Médicos"
        subtitle="Gerencie os médicos cadastrados no sistema."
        action={
          <Link href="/medicos/novo" className="ms-btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            Novo Médico
          </Link>
        }
      />
      <div className="ms-table-wrap">
        {carregando ? <LoadingSpinner text="Carregando médicos..." /> : medicos.length === 0 ? (
          <EmptyState title="Nenhum médico encontrado" description="Nenhum médico cadastrado no sistema ainda." action={{ label: "Cadastrar médico", href: "/medicos/novo" }} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="ms-table-head">
                  {["Médico","CRM","Especialidade","E-mail","Status","Ações"].map(h => (
                    <th key={h} className={"px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide" + (h === "Ações" ? " text-right" : "")}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {medicos.map(m => {
                  const ini = m.nome.split(" ").filter(Boolean).slice(0,2).map(n => n[0]).join("").toUpperCase();
                  return (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-bold flex-shrink-0">{ini}</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{m.nome}</p>
                            <p className="text-xs text-slate-400">#{m.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-mono text-slate-600">{m.crm}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{m.especialidade}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">{m.email}</td>
                      <td className="px-5 py-4">
                        <Badge variant={m.status === "ATIVO" ? "success" : "danger"} dot>{m.status === "ATIVO" ? "Ativo" : "Inativo"}</Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={"/medicos/" + m.id + "/editar"} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-cyan-50 hover:text-cyan-800 transition-colors">Editar</Link>
                          <button onClick={() => confirmarAlterarStatus(m)} className={"px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors " + (m.status === "ATIVO" ? "border border-red-200 text-red-600 hover:bg-red-50" : "border border-emerald-200 text-emerald-600 hover:bg-emerald-50")}>
                            {m.status === "ATIVO" ? "Inativar" : "Ativar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal {...modal} onClose={closeModal} />
    </div>
  );
}
