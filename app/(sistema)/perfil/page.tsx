import React from 'react';

export default function Perfil() {
  const medico = {
    nome: "Dr. Henrique Silva",
    especialidade: "Cardiologia & Arritmologia",
    crm: "12345-SP",
    email: "henrique.silva@medflow.com.br",
    plano: "Premium Plus"
  };

  return (
    /* A classe 'perfil' agora engloba toda a estrutura ocupando 100% da tela */
    <div className="perfil h-screen w-screen bg-[#f8fafc] font-sans text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR ULTRA-SLIM */}
      <aside className="w-24 bg-slate-950 h-full flex flex-col items-center py-10 border-r border-slate-800 shrink-0 z-50">
        <div className="mb-12">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
             <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2.5" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
        </div>
        <nav className="flex flex-col gap-10 text-slate-500">
          <div className="hover:text-white cursor-pointer transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg></div>
          <div className="hover:text-white cursor-pointer transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
          <div className="text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg></div>
        </nav>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL - FULL WIDTH */}
      <main className="flex-1 h-full flex flex-col min-w-0 bg-white relative">
        
        {/* BANNER DE TOPO SEM BORDAS */}
        <div className="h-64 w-full bg-slate-900 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-emerald-500/20" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
          <div className="absolute top-10 left-10 text-white/10 text-9xl font-black italic select-none">PERFIL</div>
        </div>

        {/* CONTAINER DO PERFIL (OCUPA O ESPAÇO RESTANTE) */}
        <div className="flex-1 w-full px-6 lg:px-12 -mt-32 relative z-10 overflow-y-auto pb-10">
          
          <div className="grid grid-cols-12 gap-8 h-full">
            
            {/* LADO ESQUERDO: CARTÃO MÉDICO */}
            <div className="col-span-12 xl:col-span-4 space-y-6">
              <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-44 h-44 rounded-[50px] bg-slate-50 mb-6 overflow-hidden border-4 border-white shadow-xl relative">
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-200 flex items-center justify-center">
                      <span className="text-6xl font-black text-blue-600 italic tracking-tighter">HS</span>
                    </div>
                  </div>
                  <button className="absolute bottom-6 right-0 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all scale-100 group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </button>
                </div>
                
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">{medico.nome}</h2>
                <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mb-8">{medico.especialidade}</p>
                
                <div className="w-full space-y-4 pt-6 border-t border-slate-50">
                   <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CRM Ativo</span>
                      <span className="font-black text-slate-800 tracking-tight">{medico.crm}</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assinatura</span>
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-black text-[9px] uppercase tracking-tighter">{medico.plano}</span>
                   </div>
                </div>
              </div>

              {/* CARD DE SEGURANÇA RÁPIDA */}
              <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/20 blur-3xl" />
                <h3 className="text-xl font-black mb-6 italic tracking-tight">Status da Conta</h3>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sincronizado com Nuvem</span>
                </div>
                <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">Alterar Senha</button>
              </div>
            </div>

            {/* LADO DIREITO: FORMULÁRIO GIGANTE */}
            <div className="col-span-12 xl:col-span-8">
              <div className="bg-white rounded-[50px] p-10 lg:p-14 shadow-sm border border-slate-50 h-full">
                <div className="flex justify-between items-start mb-14">
                  <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">Dados do Profissional</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Personalize sua experiência no MedFlow</p>
                  </div>
                  <button className="px-12 py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 uppercase text-xs tracking-widest">Salvar Mudanças</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 block mb-3">E-mail Profissional</label>
                    <input type="text" defaultValue={medico.email} className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[28px] font-bold text-slate-700 focus:bg-white focus:border-blue-500/20 transition-all outline-none" />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 block mb-3">WhatsApp / Telefone</label>
                    <input type="text" defaultValue="(11) 98765-4321" className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[28px] font-bold text-slate-700 focus:bg-white focus:border-blue-500/20 transition-all outline-none" />
                  </div>
                  <div className="group md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 block mb-3">Endereço de Atendimento</label>
                    <input type="text" placeholder="Ex: Av. Paulista, 1500 - Conjunto 42, São Paulo - SP" className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[28px] font-bold text-slate-700 focus:bg-white focus:border-blue-500/20 transition-all outline-none" />
                  </div>
                </div>

                <div className="mt-16 pt-12 border-t border-slate-100">
                   <h4 className="text-xl font-black text-slate-900 mb-8 italic tracking-tight">Preferências de Interface</h4>
                   <div className="flex flex-wrap gap-6">
                      <div className="flex-1 min-w-[280px] p-6 bg-blue-50/50 rounded-[35px] border border-blue-100 flex items-center justify-between group cursor-pointer hover:bg-blue-100/50 transition-all">
                        <div>
                          <p className="font-black text-blue-900 text-sm italic">Modo Escuro</p>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tight">Ajustar brilho automaticamente</p>
                        </div>
                        <div className="w-12 h-6 bg-slate-300 rounded-full relative">
                           <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-[280px] p-6 bg-slate-50 rounded-[35px] border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-slate-200 transition-all">
                        <div>
                          <p className="font-black text-slate-800 text-sm italic">Notificações Push</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Alertas de novos pacientes</p>
                        </div>
                        <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                           <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}