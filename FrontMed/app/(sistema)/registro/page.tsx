import Link from 'next/link';

export default function Registro() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_34rem),linear-gradient(135deg,#f8fbff,#eefdfb)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/92 rounded-3xl border border-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.14)] p-8 backdrop-blur">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-700/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-900">Cadastro via <span className="text-cyan-700">ColdStart</span></h1>
            <p className="text-sm text-slate-400 mt-2 text-center leading-relaxed">
              O cadastro de novas contas de medico e realizado pelo aplicativo <strong className="text-slate-600">MediSys ColdStart</strong>, disponivel para instalacao.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-50 border border-cyan-100">
              <svg className="w-5 h-5 text-cyan-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-sm text-cyan-800">Para seguranca, novos medicos so podem ser cadastrados pelo administrador do sistema via ColdStart.</p>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-sm text-slate-600">Ja tem uma conta? Acesse o sistema normalmente pelo login.</p>
            </div>
          </div>

          <Link href="/login" className="ms-btn-primary mt-6 w-full py-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Ir para o Login
          </Link>
        </div>
        <p className="text-center text-xs text-slate-400 mt-5">
          <Link href="/" className="text-cyan-700 font-bold hover:underline">Voltar ao inicio</Link>
        </p>
      </div>
    </div>
  );
}
