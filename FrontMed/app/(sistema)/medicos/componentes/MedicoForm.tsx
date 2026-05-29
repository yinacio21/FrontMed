'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { atualizar, salvar } from "@/app/services/medicoService";
import { Medico, MedicoFormProps } from "@/app/types/medicos";
import Modal, { useModal } from "@/app/components/ui/Modal";

function validarEmail(e: string) { return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e.trim()); }

export default function MedicoForm({ medicoExistente }: MedicoFormProps) {
  const [medico, setMedico] = useState<Medico>(medicoExistente || new Medico(null,"","","","","ATIVO",""));
  const [tocado, setTocado] = useState({ nome: false, crm: false, especialidade: false, email: false, senha: false });
  const { modal, closeModal, showSuccess, showError } = useModal();
  const router = useRouter();

  const ch = (campo: "nome"|"crm"|"especialidade"|"email"|"senha", val: string) => {
    setTocado(p => ({ ...p, [campo]: true }));
    setMedico(p => new Medico(p.id, campo==="nome"?val:p.nome, campo==="crm"?val:p.crm, campo==="especialidade"?val:p.especialidade, campo==="email"?val:p.email, p.status, campo==="senha"?val:p.senha));
  };

  const emailValido = medico.email ? validarEmail(medico.email) : null;
  const erros = {
    nome: tocado.nome && !medico.nome.trim(),
    crm: tocado.crm && !medico.crm.trim(),
    especialidade: tocado.especialidade && !medico.especialidade.trim(),
    email: tocado.email && emailValido === false,
    senha: tocado.senha && !medicoExistente && !medico.senha.trim(),
  };

  const podeEnviar = medico.nome.trim() && medico.crm.trim() && medico.especialidade.trim() && emailValido && (medicoExistente || medico.senha.trim());

  const handleSalvar = async (formData: FormData) => {
    if (!validarEmail(medico.email)) { setTocado(p => ({...p, email: true})); showError("E-mail invalido", "Verifique o formato do e-mail e tente novamente."); return; }
    if (medicoExistente) {
      const r = await atualizar(medico);
      if (r > 0) { showSuccess("Medico atualizado!", "Os dados foram atualizados com sucesso."); setTimeout(() => router.push("/medicos"), 1500); }
      else showError("Erro ao atualizar", "Nao foi possivel atualizar os dados.");
    } else {
      const r = await salvar(medico);
      if (r) { showSuccess("Medico cadastrado!", "Registro criado com o codigo #" + r + "."); setTimeout(() => router.push("/medicos"), 1500); }
      else showError("Erro ao cadastrar", "Nao foi possivel cadastrar o medico.");
    }
  };

  const ic = (inv: boolean) => "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-300 outline-none transition-all " + (inv ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" : "border-slate-200 bg-slate-50 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/10");
  const emailCls = "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-300 outline-none transition-all " +
    (!tocado.email || emailValido === null ? "border-slate-200 bg-slate-50 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/10" : emailValido ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" : "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20");
  const lc = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <>
      <form action={handleSalvar} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={lc}>Nome Completo *</label>
            <input required value={medico.nome} onChange={e => ch("nome", e.target.value)} onBlur={() => setTocado(p=>({...p,nome:true}))} placeholder="Ex: Dr. Joao da Silva" className={ic(erros.nome)} />
            {erros.nome && <p className="mt-1.5 text-xs text-red-500 font-medium">Nome e obrigatorio.</p>}
          </div>
          <div>
            <label className={lc}>CRM *</label>
            <input required value={medico.crm} onChange={e => ch("crm", e.target.value)} onBlur={() => setTocado(p=>({...p,crm:true}))} placeholder="Ex: 123456-SP" className={ic(erros.crm)} />
            {erros.crm && <p className="mt-1.5 text-xs text-red-500 font-medium">CRM e obrigatorio.</p>}
          </div>
          <div>
            <label className={lc}>Especialidade *</label>
            <input required value={medico.especialidade} onChange={e => ch("especialidade", e.target.value)} onBlur={() => setTocado(p=>({...p,especialidade:true}))} placeholder="Ex: Cardiologia" className={ic(erros.especialidade)} />
            {erros.especialidade && <p className="mt-1.5 text-xs text-red-500 font-medium">Especialidade e obrigatoria.</p>}
          </div>
          <div className="md:col-span-2">
            <label className={lc}>
              E-mail *
              {tocado.email && emailValido !== null && <span className={"ml-2 normal-case " + (emailValido ? "text-emerald-600" : "text-red-500")}>{emailValido ? "Valido" : "Invalido"}</span>}
            </label>
            <div className="relative">
              <input type="text" required value={medico.email} onChange={e => ch("email", e.target.value)} onBlur={() => setTocado(p=>({...p,email:true}))} placeholder="medico@exemplo.com" className={emailCls} />
              {tocado.email && emailValido !== null && (
                <div className={"absolute right-3.5 top-1/2 -translate-y-1/2 " + (emailValido ? "text-emerald-500" : "text-red-500")}>
                  {emailValido ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                </div>
              )}
            </div>
            {erros.email && <p className="mt-1.5 text-xs text-red-500 font-medium">Formato invalido. Use: usuario@dominio.com</p>}
          </div>
          {!medicoExistente && (
            <div className="md:col-span-2">
              <label className={lc}>Senha *</label>
              <input type="password" required value={medico.senha} onChange={e => ch("senha", e.target.value)} onBlur={() => setTocado(p=>({...p,senha:true}))} placeholder="Minimo 6 caracteres" className={ic(erros.senha)} />
              {erros.senha && <p className="mt-1.5 text-xs text-red-500 font-medium">Senha e obrigatoria.</p>}
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-5 border-t border-slate-100">
          <Link href="/medicos" className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors text-center">Cancelar</Link>
          <button type="submit" disabled={!podeEnviar}
            className="ms-btn-primary w-full sm:w-auto px-7">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Confirmar e Salvar
          </button>
        </div>
      </form>
      <Modal {...modal} onClose={closeModal} />
    </>
  );
}
