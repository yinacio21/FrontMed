'use client'
import { useState } from "react";
import { salvarProntuario } from "@/app/services/prontuarioService";
import { ProntuarioFormProps } from "@/app/types/prontuarios";
import Modal, { useModal } from "@/app/components/ui/Modal";

export default function ProntuarioForm({ pacienteId, onSalvo }: ProntuarioFormProps) {
  const hoje = new Date().toISOString().split("T")[0];
  const [data, setData] = useState(hoje);
  const [anotacoes, setAnotacoes] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [tocado, setTocado] = useState(false);
  const { modal, closeModal, showSuccess, showError } = useModal();

  const anotacoesInvalida = tocado && !anotacoes.trim();
  const podeEnviar = data && anotacoes.trim() && !salvando;

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setTocado(true);
    if (!anotacoes.trim()) return;
    setSalvando(true);
    try {
      await salvarProntuario({ data, anotacoesClinicas: anotacoes, pacienteId });
      showSuccess("Prontuário registrado!", "O atendimento foi registrado com sucesso.");
      setAnotacoes("");
      setData(hoje);
      setTocado(false);
      setTimeout(onSalvo, 800);
    } catch {
      showError("Erro ao registrar", "Não foi possível salvar o prontuário. Tente novamente.");
    } finally { setSalvando(false); }
  };

  return (
    <>
      <form onSubmit={handleSalvar} className="bg-[#07111f] rounded-3xl p-6 space-y-5 relative overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 blur-3xl rounded-full -translate-y-8 translate-x-8" />
        <div className="relative z-10">
          <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-cyan-300 rounded-full" />
            Novo Registro Clínico
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Data do Atendimento</label>
              <input type="date" value={data} onChange={e => setData(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium outline-none focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Anotações Clínicas *</label>
              <textarea value={anotacoes} onChange={e => { setTocado(true); setAnotacoes(e.target.value); }} required rows={5}
                placeholder="Descreva a evolução clínica, sintomas, diagnóstico e conduta terapêutica..."
                className={"w-full px-4 py-3 rounded-xl text-sm font-medium placeholder:text-white/25 outline-none transition-all resize-none " + (anotacoesInvalida ? "bg-red-500/10 border border-red-500/30 text-white focus:border-red-400/50" : "bg-white/5 border border-white/10 text-white focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10")} />
              {anotacoesInvalida && <p className="mt-1.5 text-xs text-red-400 font-medium">As anotações clínicas são obrigatórias.</p>}
            </div>
          </div>
          <button type="submit" disabled={!podeEnviar}
            className="mt-5 w-full py-3 rounded-xl bg-cyan-400 text-slate-950 font-black text-sm hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {salvando
              ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Salvando...</>
              : <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Registrar Prontuário</>
            }
          </button>
        </div>
      </form>
      <Modal {...modal} onClose={closeModal} />
    </>
  );
}
