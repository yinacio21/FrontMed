'use client'
import { Prontuario } from "@/app/types/prontuarios";
import EmptyState from "@/app/components/ui/EmptyState";

interface Props {
  prontuarios: Prontuario[];
  onDeletar?: (id: number) => void;
}

function formatData(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function ProntuarioTimeline({ prontuarios, onDeletar }: Props) {
  if (prontuarios.length === 0) {
    return (
      <EmptyState
        icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>}
        title="Nenhum prontuario registrado"
        description="Use o formulario ao lado para registrar o primeiro atendimento deste paciente."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">Historico Clinico</h3>
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          {prontuarios.length} {prontuarios.length === 1 ? "registro" : "registros"}
        </span>
      </div>
      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200" />
        <div className="space-y-4">
          {prontuarios.map((p, i) => (
            <div key={p.id} className="relative flex gap-4">
              <div className={"relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 border-2 " + (i === 0 ? "bg-cyan-700 border-cyan-700 text-white shadow-md shadow-cyan-700/25" : "bg-white border-slate-200 text-slate-500")}>
                {i === 0
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
                  : prontuarios.length - i
                }
              </div>
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-4 group hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-shadow min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide">{formatData(p.data)}</p>
                    {i === 0 && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1"><span className="w-1 h-1 rounded-full bg-emerald-500" />Mais recente</span>}
                  </div>
                  {onDeletar && p.id && (
                    <button type="button"
                      onClick={() => onDeletar(p.id!)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{p.anotacoesClinicas}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
