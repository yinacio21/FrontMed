'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginService } from "../services/authService";
import { setToken, setUsuario } from "../redux/slices/authSlice";
import { buscarMedicoLogado } from "../services/medicoService";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [tocado, setTocado] = useState({ email: false, senha: false });

  const emailInvalido = tocado.email && !email.trim();
  const senhaInvalida = tocado.senha && !senha.trim();
  const podeEnviar = email.trim() && senha.trim() && !carregando;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const result = await loginService({ email, senha });
      if (!result.token) { setErro("E-mail ou senha incorretos."); return; }
      dispatch(setToken({ token: result.token }));
      const medico = await buscarMedicoLogado();
      dispatch(setUsuario({ usuario: medico }));
      router.push("/dashboard");
    } catch {
      setErro("E-mail ou senha incorretos. Verifique e tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const ic = (invalid: boolean) =>
    "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-300 outline-none transition-all " +
    (invalid
      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
      : "border-slate-200 bg-slate-50 focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/10");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_34rem),linear-gradient(135deg,#f8fbff,#eefdfb)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/92 rounded-3xl border border-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.14)] p-8 backdrop-blur">

          {/* Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-700/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-900">Entrar no <span className="text-cyan-700">MediSys</span></h1>
            <p className="text-sm text-slate-400 mt-1">Acesse sua conta para continuar</p>
          </div>

          {/* Error banner */}
          {erro && (
            <div className="mb-5 flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              <p className="text-sm text-red-600 font-medium">{erro}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTocado(p => ({ ...p, email: true }))}
                placeholder="seu@email.com"
                className={ic(emailInvalido)}
              />
              {emailInvalido && <p className="mt-1.5 text-xs text-red-500 font-medium">Informe seu e-mail.</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                onBlur={() => setTocado(p => ({ ...p, senha: true }))}
                placeholder="••••••••"
                className={ic(senhaInvalida)}
              />
              {senhaInvalida && <p className="mt-1.5 text-xs text-red-500 font-medium">Informe sua senha.</p>}
            </div>

            <button
              type="submit"
              disabled={!podeEnviar}
              className="ms-btn-primary w-full py-3"
            >
              {carregando ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Entrando...</>
              ) : (
                <>Entrar no sistema<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-400">Ambiente seguro LGPD</span>
            </div>
            <Link href="/" className="text-xs text-cyan-700 font-bold hover:underline">Voltar ao inicio</Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Ainda nao tem conta?{" "}
          <Link href="/registro" className="text-cyan-700 font-bold hover:underline">Criar agora</Link>
        </p>
      </div>
    </div>
  );
}
