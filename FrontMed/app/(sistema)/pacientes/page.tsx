'use client'
import { useState, useEffect, useMemo } from "react";
import { listarPacientes, deletarPaciente } from "@/app/services/pacienteService";
import { Paciente } from "@/app/types/pacientes";
import Link from "next/link";
import Modal, { useModal } from "@/app/components/ui/Modal";
import EmptyState from "@/app/components/ui/EmptyState";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import PageHeader from "@/app/components/ui/PageHeader";

function formatarCPF(cpf: string): string {
  const n = cpf.replace(/\D/g, "").slice(0, 11);
  if (n.length !== 11) return cpf;
  return n.slice(0, 3) + "." + n.slice(3, 6) + "." + n.slice(6, 9) + "-" + n.slice(9);
}

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [deletandoId, setDeletandoId] = useState<number | null>(null);
  const { modal, closeModal, showError, showConfirm } = useModal();

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    setCarregando(true);
    try { setPacientes(await listarPacientes()); }
    catch { showError("Erro ao carregar", "Não foi possível carregar a lista de pacientes. Tente novamente."); }
    finally { setCarregando(false); }
  };

  const filtrados = useMemo(() =>
    busca.trim()
      ? pacientes.filter(p =>
          p.nome.toLowerCase().includes(busca.toLowerCase()) ||
          p.cpf.replace(/\D/g, "").includes(busca.replace(/\D/g, "")) ||
          p.cidade?.toLowerCase().includes(busca.toLowerCase()) ||
          p.bairro?.toLowerCase().includes(busca.toLowerCase()) ||
          p.cep?.replace(/\D/g, "").includes(busca.replace(/\D/g, ""))
        )
      : pacientes,
    [pacientes, busca]
  );

  const confirmarDeletar = (p: Paciente) => {
    showConfirm(
      "Excluir paciente",
      "Tem certeza que deseja excluir " + p.nome + "? Esta ação não pode ser desfeita.",
      async () => {
        setDeletandoId(p.id!);
        try { await deletarPaciente(p.id!); await carregar(); }
        catch { showError("Erro ao excluir", "Não foi possível excluir o paciente. Tente novamente."); }
        finally { setDeletandoId(null); }
      },
      { confirmLabel: "Sim, excluir", cancelLabel: "Cancelar" }
    );
  };

  return (
    <div className="ms-page-shell">
      <PageHeader
        title="Pacientes"
        subtitle="Gerencie os pacientes vinculados ao seu cadastro."
        action={
          <Link href="/pacientes/novo" className="ms-btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            Novo Paciente
          </Link>
        }
      />

      {/* Search */}
      <div className="mb-5">
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome ou CPF..."
            className="ms-input pl-10 py-2.5 bg-white"
          />
        </div>
      </div>

      <div className="ms-table-wrap">
        {carregando ? (
          <LoadingSpinner text="Carregando pacientes..." />
        ) : filtrados.length === 0 ? (
          <EmptyState
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>}
            title={busca ? "Nenhum resultado" : "Nenhum paciente cadastrado"}
            description={busca ? "Nenhum paciente encontrado para \"" + busca + "\"." : "Você ainda não tem pacientes. Cadastre o primeiro agora."}
            action={!busca ? { label: "Cadastrar paciente", href: "/pacientes/novo" } : undefined}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="ms-table-head">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Paciente</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">CPF</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Endereço</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">UF</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtrados.map(p => {
                  const ini = p.nome.split(" ").filter(Boolean).slice(0,2).map(n => n[0]).join("").toUpperCase();
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center text-sm font-black flex-shrink-0">{ini}</div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{p.nome}</p>
                            <p className="text-xs text-slate-400">#{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 font-mono">{formatarCPF(p.cpf)}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">
                        <p>{[p.logradouro, p.numero].filter(Boolean).join(", ") || p.cidade}</p>
                        <p className="text-xs text-slate-400">{[p.bairro, p.cidade].filter(Boolean).join(" - ")}</p>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">{p.estado}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={"/pacientes/" + p.id} className="px-3 py-1.5 rounded-lg bg-cyan-700 text-white text-xs font-bold hover:bg-cyan-800 transition-colors">Detalhes</Link>
                          <Link href={"/pacientes/" + p.id + "/editar"} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-cyan-50 hover:text-cyan-800 transition-colors">Editar</Link>
                          <button
                            onClick={() => confirmarDeletar(p)}
                            disabled={deletandoId === p.id}
                            className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {deletandoId === p.id ? "..." : "Excluir"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-400">{filtrados.length} paciente{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        )}
      </div>
      <Modal {...modal} onClose={closeModal} />
    </div>
  );
}
