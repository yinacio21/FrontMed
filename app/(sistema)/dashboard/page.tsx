import React from 'react';

export default function Dashboard() {
  const currentYear = new Date().getFullYear();
  
  const medico = {
    nome: "Dr. Henrique Silva",
    especialidade: "Cardiologia",
    crm: "12345-SP"
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR FIXA - DESIGN SLIM & GLOW */}
      <aside className="w-20 lg:w-72 bg-slate-900 h-screen sticky top-0 flex flex-col items-center py-8 gap-10 border-r border-white/5 relative shrink-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-blue-500/10 blur-3xl" />
        
        <div className="relative z-10 flex items-center gap-3 px-6 w-full">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)] shrink-0">
            <span className="text-white font-black text-2xl">M</span>
          </div>
          <span className="hidden lg:block text-white font-black tracking-tighter text-2xl uppercase">MediSys</span>
        </div>

        <nav className="flex flex-col gap-3 w-full px-4 relative z-10">
          {[
            { label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', active: true },
            { label: 'Lista de Pacientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { label: 'Prontuários', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { label: 'Configurações', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
          ].map((item, i) => (
            <a key={i} href="#" className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${item.active ? 'bg-blue-600 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} /></svg>
              <span className="hidden lg:block font-bold text-base">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto w-full px-4 border-t border-white/5 pt-6">
          <button className="flex items-center gap-4 p-4 w-full rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="hidden lg:block">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO - OCUPA TODO O RESTANTE DA TELA */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#f8fafc] p-6 lg:p-10 relative">
        {/* Luzes de Fundo para Profundidade */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-100/40 blur-[150px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-50/50 blur-[120px] -z-10 rounded-full" />

        {/* HEADER FULL-WIDTH */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12 w-full">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Painel de Controle</h1>
            <p className="text-slate-500 text-lg font-medium">Bem-vindo de volta, <span className="text-blue-600 font-bold">{medico.nome}</span>. Aqui está o resumo da sua clínica.</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white p-3 rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-white">
             <div className="hidden sm:block text-right pl-6">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{medico.especialidade}</p>
                <p className="text-sm font-black text-slate-800 tracking-tight">CRM {medico.crm}</p>
             </div>
             <div className="w-14 h-14 rounded-[20px] bg-slate-900 flex items-center justify-center text-white shadow-xl">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             </div>
          </div>
        </header>

        {/* CARDS DE ESTATÍSTICA - PREENCHIMENTO TOTAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12 w-full">
          {[
            { label: 'Total de Pacientes', value: '1.284', color: 'blue', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7' },
            { label: 'Consultas Hoje', value: '14', color: 'emerald', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Prontuários Novos', value: '48', color: 'amber', icon: 'M9 12h6m-6 4h6m2 5H7' },
            { label: 'Satisfação', value: '98%', color: 'purple', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-white shadow-[0_25px_50px_-15px_rgba(0,0,0,0.05)] relative group hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d={stat.icon} /></svg>
                </div>
                <div className={`w-3 h-3 rounded-full bg-${stat.color}-500 shadow-[0_0_15px_rgba(0,0,0,0.1)] animate-pulse`} />
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* SEÇÃO INFERIOR - FLEX GRID EXPANSIVO */}
        <div className="grid grid-cols-12 gap-8 w-full">
          
          {/* TABELA DE PACIENTES - OCUPA 2/3 DA LARGURA */}
          <div className="col-span-12 xl:col-span-8 bg-white rounded-[48px] p-10 border border-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-3 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pacientes Recentes</h3>
              </div>
              <a href="/pacientes" className="bg-slate-50 px-6 py-3 rounded-2xl text-blue-600 font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors">Ver Lista Completa</a>
            </div>
            
            <div className="space-y-5">
              {[
                { nome: 'Ana Beatriz Souza', cpf: '123.***.***-01', cidade: 'São Paulo', data: 'Há 12 min' },
                { nome: 'Marcos Oliveira', cpf: '456.***.***-05', cidade: 'Campinas', data: 'Há 1 hora' },
                { nome: 'Clara Mendes', cpf: '789.***.***-10', cidade: 'Santos', data: 'Há 3 horas' },
                { nome: 'Ricardo Pereira', cpf: '101.***.***-22', cidade: 'Curitiba', data: 'Ontem' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-[32px] bg-[#f8fbff] border border-blue-50 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-black text-xl text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                      {p.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-lg">{p.nome}</p>
                      <p className="text-sm font-bold text-slate-400">{p.cpf} <span className="mx-2 text-slate-200">|</span> {p.cidade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="hidden md:block text-xs font-black text-slate-400 uppercase tracking-widest">{p.data}</span>
                    <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-lg transition-all">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUNA LATERAL - OCUPA 1/3 DA LARGURA */}
          <div className="col-span-12 xl:col-span-4 space-y-8 flex flex-col">
            
            {/* CARD DE AÇÕES RÁPIDAS - GLOW DARK */}
            <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl flex-1">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 blur-[60px] rounded-full" />
              
              <h3 className="text-2xl font-black mb-8 relative z-10 tracking-tight">Atalhos Médicos</h3>
              <div className="space-y-5 relative z-10">
                <a href="/pacientes/novo" className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-[1.02] transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <div>
                    <p className="font-black text-lg">Novo Paciente</p>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Cadastro Rápido</p>
                  </div>
                </a>
                
                <a href="/prontuarios/novo" className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-[1.02] transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </div>
                  <div>
                    <p className="font-black text-lg">Evolução Clínica</p>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Novo Prontuário</p>
                  </div>
                </a>
              </div>
            </div>

            {/* CARD DE SEGURANÇA - LED GREEN */}
            <div className="bg-white rounded-[48px] p-10 border border-emerald-100 flex flex-col items-center text-center shadow-xl shadow-emerald-900/5">
              <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mb-6 shadow-[0_15px_30px_rgba(16,185,129,0.4)] animate-pulse">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-slate-900 font-black text-2xl tracking-tight mb-2">Proteção MediSys</h4>
              <p className="text-slate-500 font-semibold leading-relaxed">
                Sua conta está operando sob criptografia ponta-a-ponta. Os dados dos seus pacientes estão isolados e seguros.
              </p>
            </div>
          </div>

        </div>

        {/* FOOTER FULL-WIDTH */}
        <footer className="mt-16 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] pb-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Sistema Online • v3.0.4</span>
          </div>
          <span>MediSys Premium Management • {currentYear} • LGPD Compliant</span>
        </footer>
      </main>
    </div>
  );
}