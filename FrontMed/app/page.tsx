import Link from 'next/link';

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=2200&q=85";

const FEATURES = [
  {
    title: "Prontuário sempre organizado",
    desc: "Registros clínicos em linha do tempo, com contexto do paciente e histórico fácil de consultar durante o atendimento.",
    tone: "from-sky-500 to-cyan-400",
  },
  {
    title: "Rotina médica mais fluida",
    desc: "Pacientes, médicos, dados cadastrais e atendimentos reunidos em uma interface clara para uso diário.",
    tone: "from-emerald-500 to-teal-400",
  },
  {
    title: "Acesso protegido por conta",
    desc: "Cada médico trabalha com seus próprios dados, mantendo sigilo, controle e previsibilidade no fluxo de trabalho.",
    tone: "from-indigo-500 to-blue-500",
  },
];

const METRICS = [
  ["Pacientes", "Cadastro centralizado"],
  ["Prontuários", "Histórico por atendimento"],
  ["Médicos", "Gestão de contas"],
  ["Segurança", "Acesso autenticado"],
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/14 ring-1 ring-white/20 backdrop-blur">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight">MediSys</span>
          </div>
        </div>
      </header>

      <main>
        <section
          className="relative min-h-[92vh] overflow-hidden bg-slate-950"
          style={{
            backgroundImage: `linear-gradient(115deg, rgba(2,6,23,0.88) 0%, rgba(15,23,42,0.74) 43%, rgba(14,116,144,0.42) 100%), url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f5f7fb] to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 pb-20 pt-28 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 shadow-2xl backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
                Gestão clínica inteligente
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Atendimento médico com mais clareza, controle e segurança.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
                O MediSys organiza pacientes, prontuários e rotinas da clínica em uma experiência visual precisa, rápida e confiável para o uso profissional.
              </p>
              <div className="mt-9">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-black text-slate-950 shadow-[0_20px_50px_rgba(34,211,238,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/35"
                >
                  Entrar no sistema
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.7" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative -mt-16 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur md:grid-cols-4">
              {METRICS.map(([title, desc]) => (
                <div key={title} className="border-b border-slate-100 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <p className="text-sm font-black text-slate-950">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Experiência de produto</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Uma interface pensada para a rotina de consultório.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <article key={feature.title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
                  <div className={"mb-6 h-12 w-12 rounded-2xl bg-gradient-to-br shadow-lg " + feature.tone} />
                  <h3 className="text-lg font-black text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-7">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span className="font-bold text-slate-800">MediSys</span>
          <span>© {new Date().getFullYear()} Gestão clínica inteligente.</span>
        </div>
      </footer>
    </div>
  );
}
