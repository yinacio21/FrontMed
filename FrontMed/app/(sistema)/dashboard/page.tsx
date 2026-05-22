'use client'

import React from 'react';

export default function DashboardReport() {
  const currentYear = new Date().getFullYear();
  
  const medico = {
    nome: "Dr. Henrique Silva",
    especialidade: "Cardiologia",
    crm: "12345-SP"
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 overflow-x-hidden">
      
      {/* MAIN CONTENT - Agora ocupando 100% da largura */}
      <main className="relative min-h-screen">
        {/* Background Gradients - Efeito de profundidade da Landing Page */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/40 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-50/50 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-[1400px] mx-auto p-6 lg:p-12 relative z-10">
          
          {/* TOP BAR / HEADER */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">Relatório Analítico</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Painel de Gestão</h1>
              <p className="text-slate-500 font-medium text-lg mt-2">
                Bem-vindo, <span className="text-slate-900 font-bold">{medico.nome}</span>. Aqui está o resumo da sua unidade.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-3 pr-8 rounded-[24px] shadow-sm border border-slate-100 ring-4 ring-slate-50">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 relative">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">{medico.especialidade}</p>
                <p className="text-base font-black text-slate-800 tracking-tight">CRM {medico.crm}</p>
              </div>
            </div>
          </header>

          {/* STATS GRID - 4 Colunas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {[
              { label: 'Pacientes Totais', value: '1,284', trend: '+12%', color: 'blue' },
              { label: 'Atendimentos', value: '14 hoje', trend: 'Estável', color: 'emerald' },
              { label: 'Faturamento Mes', value: 'R$ 12.4k', trend: '+8%', color: 'indigo' },
              { label: 'NPS Clínica', value: '98%', trend: 'Excelente', color: 'amber' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-${stat.color}-50 text-${stat.color}-600`}>
                    {stat.trend}
                  </div>
                  <div className={`w-3 h-3 rounded-full bg-${stat.color}-500 shadow-[0_0_12px_rgba(0,0,0,0.15)]`} />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* CONTENT GRID - Tabelas e Ações */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* TABELA DE PACIENTES - Ocupa 8 colunas no desktop */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-[45px] p-8 lg:p-10 border border-slate-100 shadow-sm h-full">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <span className="w-2.5 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
                    Fila de Atendimento
                  </h3>
                  <button className="px-6 py-2 rounded-xl bg-slate-50 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">Ver Histórico</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                        <th className="pb-6 pl-4">Identificação do Paciente</th>
                        <th className="pb-6">Status Atual</th>
                        <th className="pb-6 text-right pr-4">Ações de Prontuário</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { nome: 'Ana Beatriz Souza', status: 'Finalizado', hora: '09:15', iniciais: 'AS', color: 'bg-emerald-100 text-emerald-600' },
                        { nome: 'Marcos Oliveira', status: 'Em espera', hora: '10:30', iniciais: 'MO', color: 'bg-amber-100 text-amber-600' },
                        { nome: 'Clara Mendes', status: 'Agendado', hora: '11:00', iniciais: 'CM', color: 'bg-blue-100 text-blue-600' },
                        { nome: 'Ricardo Pereira', status: 'Agendado', hora: '14:30', iniciais: 'RP', color: 'bg-blue-100 text-blue-600' },
                      ].map((p, i) => (
                        <tr key={i} className="group hover:bg-slate-50/70 transition-all cursor-pointer">
                          <td className="py-6 pl-4">
                            <div className="flex items-center gap-5">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${p.color}`}>
                                {p.iniciais}
                              </div>
                              <div>
                                <p className="font-black text-slate-800 text-lg tracking-tight leading-none">{p.nome}</p>
                                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">Check-in: {p.hora}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-6">
                            <span className="px-4 py-1.5 rounded-lg text-xs font-black bg-slate-100 text-slate-600 group-hover:bg-white transition-colors tracking-wide">
                              {p.status}
                            </span>
                          </td>
                          <td className="py-6 text-right pr-4">
                            <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-100 hover:scale-105 transition-transform active:scale-95">
                              Abrir Prontuário
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS & SECURITY - Ocupa 4 colunas */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <div className="bg-slate-950 rounded-[45px] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-100">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-600/30 blur-[70px] rounded-full" />
                <h3 className="text-xl font-black mb-8 relative z-10 tracking-tight">Atalhos Operacionais</h3>
                <div className="grid grid-cols-1 gap-4 relative z-10">
                  <button className="flex items-center gap-4 p-5 rounded-[24px] bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all text-left">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <div>
                        <span className="font-black text-base block leading-none mb-1">Novo Paciente</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cadastro Rápido</span>
                    </div>
                  </button>
                  <button className="flex items-center gap-4 p-5 rounded-[24px] bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all text-left">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                        <span className="font-black text-base block leading-none mb-1">Receituário</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Assinatura Digital</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Security Status Card */}
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 tracking-tight text-lg">Proteção LGPD</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ativo e Criptografado</p>
                        </div>
                    </div>
                </div>
                <p className="text-sm font-medium text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                    Seu ambiente clínico está operando com criptografia **AES-256** e backups em tempo real concluídos às 03:00 AM.
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="mt-16 py-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-3 px-5 py-2 bg-white border border-slate-100 text-slate-600 rounded-full shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-[11px] font-black uppercase tracking-widest">Sistemas Estáveis</span>
             </div>
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] text-center md:text-right">
               MediSys Elite Management • v4.2.0 • {currentYear}
             </p>
          </footer>
        </div>
      </main>
    </div>
  );
}