import React from 'react';

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700 overflow-x-hidden">
      
      {/* 1. HERO SECTION - EFEITO LED E LUZES */}
      <section className="relative overflow-hidden bg-white pb-24 pt-20 lg:pb-32 lg:pt-40">
        {/* Luzes de Fundo (Leds Ambientais) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-emerald-100/40 blur-[100px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            
            {/* TEXTO DE IMPACTO */}
            <div className="lg:w-[50%] space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-emerald-100 px-4 py-2 shadow-[0_10px_20px_-5px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                </span>
                <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase">Sistema Cloud Ativo</span>
              </div>

              <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl xl:text-7xl leading-[1.1] max-w-[20ch] lg:max-w-none">
                Gestão clínica com a <br />
                <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-sm">
                  excelência que você merece.
                </span>
              </h1>
              
              <p className="max-w-xl text-lg lg:text-xl leading-relaxed text-slate-500 font-medium border-l-4 border-blue-500/20 pl-6">
                Prontuários eletrônicos intuitivos e segurança de nível bancário. 
                Sua clínica 100% digital em um único clique.
              </p>
              
              <div className="flex flex-col gap-5 sm:flex-row">
                <a href="/login" className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-10 py-5 text-lg font-bold text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.6)] active:scale-95 ring-2 ring-blue-400/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                   Fazer Login
                </a>
                
                <a href="/registro" className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-10 py-5 text-lg font-bold text-white shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.5)] active:scale-95 ring-2 ring-emerald-300/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
                  Criar Minha Conta
                </a>
              </div>
            </div>
            
            {/* DASHBOARD ILUMINADO (LED EFFECT) */}
            <div className="lg:w-[50%] w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                {/* Aura de LED atrás do card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-[40px] blur-2xl opacity-20 -rotate-2 scale-105" />
                
                <div className="relative z-10 rounded-[40px] bg-white p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_0_1px_1px_rgba(0,0,0,0.02)] border border-white">
                  
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.5)]">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6m-3-3h6"/></svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">Painel Analítico</h3>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Real-time</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner overflow-hidden relative group">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Volume Semanal</p>
                      <div className="flex items-end justify-between gap-2 h-24 relative z-10">
                        {[40, 65, 45, 100, 70, 85, 50].map((h, i) => (
                          <div key={i} className={`w-full rounded-t-xl transition-all duration-1000 ${h === 100 ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-blue-200'}`} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="col-span-6 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_5px_rgba(37,99,235,0.2)]">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="3.5"></circle>
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-600" strokeWidth="3.5" strokeDasharray="75, 100" strokeLinecap="round"></circle>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-800">75%</span>
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase mt-3">Retorno</p>
                    </div>

                    <div className="col-span-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-blue-500/20 transition-colors" />
                      <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Ativos</p>
                      <p className="text-3xl font-black text-white">1,284</p>
                      <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[80%] rounded-full shadow-[0_0_8px_#34d399]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tag de Segurança Flutuante (LED Glow) */}
                <div className="absolute -bottom-8 -left-8 z-20 bg-white p-5 rounded-[30px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-blue-50 flex items-center gap-4 transition-transform hover:scale-105">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Segurança</p>
                    <p className="text-sm font-black text-slate-800">LGPD Full</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEMA -> SOLUÇÃO (SOMBRAS PROFUNDAS) */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Chega de perder tempo com processos manuais.</h2>
              <div className="space-y-4">
                {["Risco de vazamento de informações", "Dificuldade para localizar históricos", "Cadastros repetitivos e lentos"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-slate-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all group">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors shadow-sm">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                    </div>
                    <span className="font-bold text-slate-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-12 rounded-[50px] shadow-[0_50px_100px_-30px_rgba(37,99,235,0.15)] border border-blue-50 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-[50px]" />
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)]">
                 <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">A Solução MediSys</h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                Centralizamos pacientes e históricos em um ambiente **seguro, criptografado e intuitivo**. 
                Organização máxima com um visual que você ama usar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEGURANÇA (DARK LED MODE) */}
      <section className="py-32 bg-[#0f172a] relative overflow-hidden">
        {/* LED Glow Fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[150px]" />
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-3xl mb-16">
            <h2 className="text-blue-400 font-black uppercase tracking-[0.4em] text-xs mb-4">Cyber Security</h2>
            <h3 className="text-4xl sm:text-5xl font-bold leading-[1.2]">
              Arquitetura blindada com <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]">proteção em tempo real.</span>
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { t: "Isolamento Total", d: "Instâncias de dados separadas para cada clínica, garantindo privacidade." },
              { t: "Criptografia de Ponta", d: "Seus dados viajam e repousam sob chaves de segurança AES-256." },
              { t: "Audit Log", d: "Saiba exatamente quem, quando e onde cada registro foi acessado." }
            ].map((card, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h4 className="text-xl font-bold mb-4">{card.t}</h4>
                <p className="text-slate-400 font-medium leading-relaxed text-sm">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FUNCIONALIDADES (CARDS 3D) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Potência em cada detalhe</h2>
            <p className="text-slate-500 font-bold text-lg">A evolução tecnológica que o seu consultório esperava.</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { t: "Gestão VIP", d: "Inteligência geográfica e automação de cadastros.", c: "blue", i: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
              { t: "Timeline Evolutiva", d: "Histórico clínico visual em uma linha do tempo dinâmica.", c: "emerald", i: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { t: "Performance", d: "Interface otimizada para zero atraso no atendimento.", c: "amber", i: "M13 10V3L4 14h7v7l9-11h-7z" }
            ].map((f, i) => (
              <div key={i} className="p-10 rounded-[45px] bg-slate-50 border border-white shadow-[10px_10px_30px_rgba(0,0,0,0.02),-10px_-10px_30px_rgba(255,255,255,0.9)] hover:translate-y-[-8px] transition-all duration-500">
                <div className={`w-16 h-16 bg-${f.c}-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-${f.c}-200`}>
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={f.i}/></svg>
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-800 tracking-tight">{f.t}</h3>
                <p className="text-slate-500 font-semibold leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA FINAL - GLOW FINAL */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-slate-900 rounded-[70px] p-12 lg:p-24 text-center relative overflow-hidden shadow-[0_60px_100px_-20px_rgba(15,23,42,0.4)]">
          {/* LED Glow Animado */}
          <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[150%] bg-blue-600/20 blur-[120px] rotate-12" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[150%] bg-emerald-500/20 blur-[120px] -rotate-12" />
          
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-12 relative z-10 leading-tight tracking-tight">
            Sua clínica, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">elevada ao máximo.</span>
          </h2>
          
          <a href="/registro" className="inline-block relative z-10 bg-white text-slate-900 px-16 py-7 rounded-[28px] text-2xl font-black shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all hover:scale-110 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            Criar Minha Conta
          </a>
          
          <div className="mt-20 pt-10 border-t border-white/10 relative z-10">
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.6em]">
              © {currentYear} • MediSys Elite Management
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}