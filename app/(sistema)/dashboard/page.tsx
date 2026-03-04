import React from 'react';

export default function Dashboard() {
  const currentYear = new Date().getFullYear();
  
  const medico = {
    nome: "Dr. Henrique Silva",
    especialidade: "Cardiologia",
    crm: "12345-SP"
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR - REFINADA COM VIDRO (GLASSMORPISM) */}
      <aside className="w-20 lg:w-72 bg-slate-950 h-screen sticky top-0 flex flex-col py-10 border-r border-slate-800 shrink-0 z-50">
        <div className="px-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.4)]">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="hidden lg:block text-white font-black tracking-tight text-2xl">MediSys<span className="text-blue-500">.</span></span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-4">
          {[
            { label: 'Dashboard', icon: 'M4 6h16M4 12h16M4 18h16', active: true },
            { label: 'Pacientes', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { label: 'Agenda', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { label: 'Financeiro', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((item, i) => (
            <a key={i} href="#" className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${item.active ? 'bg-blue-600/10 text-blue-500 shadow-sm' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
              <div className={`${item.active ? 'text-blue-500' : 'text-slate-600 group-hover:text-slate-300'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d={item.icon} /></svg>
              </div>
              <span className="hidden lg:block font-bold">{item.label}</span>
              {item.active && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" />}
            </a>
          ))}
        </nav>

        <div className="px-4 mt-auto">
          <button className="flex items-center gap-4 p-4 w-full rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
            <span className="hidden lg:block">Sair</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#f8fafc] relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/30 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-[1600px] mx-auto p-6 lg:p-10">
          
          {/* TOP BAR */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
              <p className="text-slate-500 font-medium">Olá, <span className="text-slate-900 font-bold">{medico.nome}</span>. Veja o que mudou hoje.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{medico.especialidade}</p>
                <p className="text-sm font-bold text-slate-800">CRM {medico.crm}</p>
              </div>
            </div>
          </header>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Pacientes', value: '1,284', trend: '+12%', color: 'blue' },
              { label: 'Consultas', value: '14 hoje', trend: 'Normal', color: 'emerald' },
              { label: 'Faturamento', value: 'R$ 12.4k', trend: '+8%', color: 'indigo' },
              { label: 'Satisfação', value: '98%', trend: 'Estável', color: 'amber' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-${stat.color}-50 text-${stat.color}-600`}>
                    {stat.trend}
                  </div>
                  <div className={`w-2 h-2 rounded-full bg-${stat.color}-500 shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* MAIN FEED (Pacientes) */}
            <div className="col-span-12 xl:col-span-8 space-y-6">
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <span className="w-2 h-6 bg-blue-600 rounded-full" />
                    Atendimentos Recentes
                  </h3>
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Ver todos</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                        <th className="pb-4 pl-4">Paciente</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Horário</th>
                        <th className="pb-4 text-right pr-4">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { nome: 'Ana Beatriz Souza', status: 'Finalizado', hora: '09:15', iniciais: 'AS', color: 'bg-emerald-100 text-emerald-600' },
                        { nome: 'Marcos Oliveira', status: 'Em espera', hora: '10:30', iniciais: 'MO', color: 'bg-amber-100 text-amber-600' },
                        { nome: 'Clara Mendes', status: 'Agendado', hora: '11:00', iniciais: 'CM', color: 'bg-blue-100 text-blue-600' },
                        { nome: 'Ricardo Pereira', status: 'Agendado', hora: '14:30', iniciais: 'RP', color: 'bg-blue-100 text-blue-600' },
                      ].map((p, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                          <td className="py-4 pl-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${p.color}`}>
                                {p.iniciais}
                              </div>
                              <span className="font-bold text-slate-700">{p.nome}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-xs font-bold text-slate-500">{p.status}</span>
                          </td>
                          <td className="py-4 font-medium text-slate-400 text-sm">{p.hora}</td>
                          <td className="py-4 text-right pr-4">
                            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SIDE FEED (Ações e Segurança) */}
            <div className="col-span-12 xl:col-span-4 space-y-6">
              {/* Quick Actions */}
              <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full" />
                <h3 className="text-lg font-black mb-6 relative z-10">Ações Rápidas</h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <button className="flex flex-col gap-3 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <span className="font-bold text-sm">Novo<br/>Paciente</span>
                  </button>
                  <button className="flex flex-col gap-3 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <span className="font-bold text-sm">Receita<br/>Digital</span>
                  </button>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex items-center gap-6">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 tracking-tight">LGPD Ativa</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">Dados criptografados e backup diário concluído.</p>
                </div>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <footer className="mt-12 py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Servidores Estáveis
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
               MediSys v4.0 • {currentYear} • Sistema de Gestão Hospitalar Premium
             </p>
          </footer>
        </div>
      </main>
    </div>
  );
}