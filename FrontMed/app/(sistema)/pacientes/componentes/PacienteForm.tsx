'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { salvarPaciente, atualizarPaciente } from "@/app/services/pacienteService";
import { buscarEnderecoPorCep } from "@/app/services/viaCepService";
import { PacienteFormProps } from "@/app/types/pacientes";
import Modal, { useModal } from "@/app/components/ui/Modal";

const ESTADOS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

function validarCPF(cpf: string): boolean {
  const n = cpf.replace(/\D/g,"");
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  for (let j = 9; j < 11; j++) {
    let soma = 0, peso = j + 1;
    for (let i = 0; i < j; i++) soma += parseInt(n[i]) * peso--;
    const r = soma % 11;
    if ((r < 2 ? "0" : String(11-r)) !== n[j]) return false;
  }
  return true;
}

function mascaraCPF(v: string): string {
  const n = v.replace(/\D/g,"").slice(0,11);
  if (n.length<=3) return n;
  if (n.length<=6) return n.slice(0,3)+"."+n.slice(3);
  if (n.length<=9) return n.slice(0,3)+"."+n.slice(3,6)+"."+n.slice(6);
  return n.slice(0,3)+"."+n.slice(3,6)+"."+n.slice(6,9)+"-"+n.slice(9);
}

function mascaraCEP(v: string): string {
  const n = v.replace(/\D/g,"").slice(0,8);
  if (n.length <= 5) return n;
  return n.slice(0,5) + "-" + n.slice(5);
}

export default function PacienteForm({ pacienteExistente }: PacienteFormProps) {
  const router = useRouter();
  const { modal, closeModal, showSuccess, showError } = useModal();
  const [form, setForm] = useState(pacienteExistente
    ? {
        nome: pacienteExistente.nome ?? "",
        cpf: mascaraCPF(pacienteExistente.cpf ?? ""),
        cep: pacienteExistente.cep ?? "",
        logradouro: pacienteExistente.logradouro ?? "",
        numero: pacienteExistente.numero ?? "",
        complemento: pacienteExistente.complemento ?? "",
        bairro: pacienteExistente.bairro ?? "",
        estado: pacienteExistente.estado ?? "",
        cidade: pacienteExistente.cidade ?? "",
      }
    : { nome: "", cpf: "", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", estado: "", cidade: "" }
  );
  const [tocado, setTocado] = useState({
    nome: false,
    cpf: false,
    cep: false,
    logradouro: false,
    numero: false,
    bairro: false,
    estado: false,
    cidade: false,
  });
  const [salvando, setSalvando] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);

  const set = (campo: keyof typeof form, valor: string) => {
    setTocado(p => ({ ...p, [campo]: true }));
    setForm(p => ({
      ...p,
      [campo]: campo === "cpf" ? mascaraCPF(valor) : campo === "cep" ? mascaraCEP(valor) : valor
    }));
  };

  const buscarCep = async () => {
    const cepDigitos = form.cep.replace(/\D/g,"");
    setTocado(p => ({ ...p, cep: true }));
    if (cepDigitos.length !== 8) return;

    setBuscandoCep(true);
    try {
      const endereco = await buscarEnderecoPorCep(form.cep);
      if (!endereco) {
        showError("CEP nao encontrado", "Confira o CEP informado e tente novamente.");
        return;
      }
      setForm(p => ({
        ...p,
        cep: endereco.cep || p.cep,
        logradouro: endereco.logradouro || p.logradouro,
        complemento: p.complemento || endereco.complemento || "",
        bairro: endereco.bairro || p.bairro,
        cidade: endereco.localidade || p.cidade,
        estado: endereco.uf || p.estado,
      }));
      setTocado(p => ({ ...p, logradouro: true, bairro: true, cidade: true, estado: true }));
    } catch {
      showError("Erro ao consultar CEP", "Nao foi possivel buscar o endereco pelo ViaCEP.");
    } finally {
      setBuscandoCep(false);
    }
  };

  const cpfDigitos = form.cpf.replace(/\D/g,"");
  const cpfCompleto = cpfDigitos.length === 11;
  const cpfValido = cpfCompleto ? validarCPF(form.cpf) : null;
  const cepCompleto = form.cep.replace(/\D/g,"").length === 8;

  const erros = {
    nome: tocado.nome && !form.nome.trim(),
    cpf: tocado.cpf && cpfCompleto && cpfValido === false,
    cep: tocado.cep && !cepCompleto,
    logradouro: tocado.logradouro && !form.logradouro.trim(),
    numero: tocado.numero && !form.numero.trim(),
    bairro: tocado.bairro && !form.bairro.trim(),
    cidade: tocado.cidade && !form.cidade.trim(),
    estado: tocado.estado && !form.estado,
  };

  const podeEnviar =
    form.nome.trim() &&
    form.cpf &&
    cepCompleto &&
    form.logradouro.trim() &&
    form.numero.trim() &&
    form.bairro.trim() &&
    form.cidade.trim() &&
    form.estado &&
    cpfValido !== false &&
    !salvando &&
    !buscandoCep;

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cpfValido === false) { showError("CPF invalido", "O CPF informado nao e valido. Verifique os digitos e tente novamente."); return; }
    if (!cepCompleto) { showError("CEP invalido", "Informe um CEP com 8 digitos."); return; }
    setSalvando(true);
    try {
      if (pacienteExistente?.id) {
        const ok = await atualizarPaciente(pacienteExistente.id, form);
        if (ok) { showSuccess("Paciente atualizado!", "Os dados foram atualizados com sucesso."); setTimeout(() => router.push("/pacientes"), 1500); }
        else showError("Erro ao atualizar", "Nao foi possivel atualizar o paciente.");
      } else {
        const id = await salvarPaciente(form);
        if (id) { showSuccess("Paciente cadastrado!", "O paciente foi registrado com o codigo #" + id + "."); setTimeout(() => router.push("/pacientes"), 1500); }
        else showError("Erro ao cadastrar", "Nao foi possivel cadastrar o paciente.");
      }
    } catch (err: unknown) {
      const msg =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: unknown } }).response?.data === "string"
          ? (err as { response: { data: string } }).response.data
          : "Nao foi possivel salvar o paciente. Verifique os dados.";
      showError("Erro", msg);
    } finally { setSalvando(false); }
  };

  const inputCls = (invalid: boolean) =>
    "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-300 outline-none transition-all " +
    (invalid ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20" : "border-slate-200 bg-slate-50 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/10");

  const cpfCls =
    "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-300 outline-none transition-all " +
    (!tocado.cpf || !cpfCompleto ? "border-slate-200 bg-slate-50 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/10" :
     cpfValido ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" :
     "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20");

  const lc = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <>
      <form onSubmit={handleSalvar} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={lc}>Nome Completo *</label>
            <input required value={form.nome} onChange={e => set("nome", e.target.value)} onBlur={() => setTocado(p => ({...p, nome: true}))} placeholder="Ex: Maria da Silva" className={inputCls(erros.nome)} />
            {erros.nome && <p className="mt-1.5 text-xs text-red-500 font-medium">Nome e obrigatorio.</p>}
          </div>

          <div>
            <label className={lc}>
              CPF *
              {tocado.cpf && cpfCompleto && (
                <span className={"ml-2 normal-case " + (cpfValido ? "text-emerald-600" : "text-red-500")}>
                  {cpfValido ? "Valido" : "Invalido"}
                </span>
              )}
            </label>
            <div className="relative">
              <input value={form.cpf} onChange={e => set("cpf", e.target.value)} onBlur={() => setTocado(p => ({...p, cpf: true}))} placeholder="000.000.000-00" inputMode="numeric" className={cpfCls} />
              {tocado.cpf && cpfCompleto && (
                <div className={"absolute right-3.5 top-1/2 -translate-y-1/2 " + (cpfValido ? "text-emerald-500" : "text-red-500")}>
                  {cpfValido
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  }
                </div>
              )}
            </div>
            {erros.cpf && <p className="mt-1.5 text-xs text-red-500 font-medium">CPF invalido. Verifique os digitos verificadores.</p>}
          </div>

          <div>
            <label className={lc}>
              CEP *
              {buscandoCep && <span className="ml-2 normal-case text-cyan-700">Buscando...</span>}
            </label>
            <input required value={form.cep} onChange={e => set("cep", e.target.value)} onBlur={buscarCep} placeholder="00000-000" inputMode="numeric" className={inputCls(erros.cep)} />
            {erros.cep && <p className="mt-1.5 text-xs text-red-500 font-medium">CEP deve ter 8 digitos.</p>}
          </div>

          <div className="md:col-span-2">
            <label className={lc}>Logradouro *</label>
            <input required value={form.logradouro} onChange={e => set("logradouro", e.target.value)} onBlur={() => setTocado(p => ({...p, logradouro: true}))} placeholder="Ex: Rua das Flores" className={inputCls(erros.logradouro)} />
            {erros.logradouro && <p className="mt-1.5 text-xs text-red-500 font-medium">Logradouro e obrigatorio.</p>}
          </div>

          <div>
            <label className={lc}>Numero *</label>
            <input required value={form.numero} onChange={e => set("numero", e.target.value)} onBlur={() => setTocado(p => ({...p, numero: true}))} placeholder="Ex: 123" className={inputCls(erros.numero)} />
            {erros.numero && <p className="mt-1.5 text-xs text-red-500 font-medium">Numero e obrigatorio.</p>}
          </div>

          <div>
            <label className={lc}>Complemento</label>
            <input value={form.complemento} onChange={e => set("complemento", e.target.value)} placeholder="Ex: Apto 45" className={inputCls(false)} />
          </div>

          <div>
            <label className={lc}>Bairro *</label>
            <input required value={form.bairro} onChange={e => set("bairro", e.target.value)} onBlur={() => setTocado(p => ({...p, bairro: true}))} placeholder="Ex: Centro" className={inputCls(erros.bairro)} />
            {erros.bairro && <p className="mt-1.5 text-xs text-red-500 font-medium">Bairro e obrigatorio.</p>}
          </div>

          <div>
            <label className={lc}>Cidade *</label>
            <input required value={form.cidade} onChange={e => set("cidade", e.target.value)} onBlur={() => setTocado(p => ({...p, cidade: true}))} placeholder="Ex: Sao Paulo" className={inputCls(erros.cidade)} />
            {erros.cidade && <p className="mt-1.5 text-xs text-red-500 font-medium">Cidade e obrigatoria.</p>}
          </div>

          <div>
            <label className={lc}>Estado *</label>
            <select required value={form.estado} onChange={e => set("estado", e.target.value)} onBlur={() => setTocado(p => ({...p, estado: true}))} className={inputCls(erros.estado)}>
              <option value="">Selecione o estado</option>
              {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
            </select>
            {erros.estado && <p className="mt-1.5 text-xs text-red-500 font-medium">Estado e obrigatorio.</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-5 border-t border-slate-100">
          <Link href="/pacientes" className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors text-center">Cancelar</Link>
          <button type="submit" disabled={!podeEnviar}
            className="ms-btn-primary w-full sm:w-auto px-7">
            {salvando
              ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Salvando...</>
              : <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Confirmar e Salvar</>
            }
          </button>
        </div>
      </form>
      <Modal {...modal} onClose={closeModal} />
    </>
  );
}
