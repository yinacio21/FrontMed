import React from 'react';

export default function CadastroPaciente() {
  return (
    // h-screen e w-full garantem que o app ocupe 100% da janela
    <div className="h-screen w-full bg-[#f8fafc] font-sans text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR VERTICAL FIXA - Ocupa toda a altura esquerda */}
      <aside className="w-20 lg:w-72 bg-slate-950 h-full flex flex-col py-10 border-r border-slate-800 shrink-0 z-50">
        <div className="px-8 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="hidden lg:block text-white font-black tracking-tight text-2xl uppercase italic">Med<span className="text-emerald-500">Flow</span></span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-4 px-4">
           {/* Link Ativo */}
           <div className="flex items-center gap-4 p-5 rounded-[24px] bg-blue-600 text-white shadow-2xl shadow-blue-900/40 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              <span className="hidden lg:block font-black text-sm uppercase tracking-widest">Novo Paciente</span>
           </div>
           {/* Link Inativo */}
           <div className="flex items-center gap-4 p-5 rounded-[24px] text-slate-500 hover:bg-white/5 transition-all cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              <span className="hidden lg:block font-black text-sm uppercase tracking-widest">Dashboard</span>
           </div>
        </nav>
      </aside>

      {/* ÁREA DE CONTEÚDO - PREENCHIMENTO TOTAL (FULL SCREEN) */}
      <main className="flex-1 h-full bg-white relative flex flex-col min-w-0">
        
        {/* BARRA SUPERIOR INTEGRADA (HEADER SEM SEPARAÇÃO) */}
        <div className="w-full p-8 lg:p-12 flex justify-between items-center bg-white border-b border-slate-50">
          <div className="flex items-center gap-6">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Novo Paciente</h1>
            <div className="h-10 w-[2px] bg-slate-100 hidden md:block"></div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] hidden md:block">Registro de prontuário eletrônico v4.0</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="px-8 py-4 rounded-2xl font-black text-slate-400 hover:text-red-500 transition-all uppercase text-xs tracking-widest">Descartar</button>
            <button className="px-12 py-5 rounded-[24px] bg-slate-900 text-white font-black hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/20 uppercase text-xs tracking-widest">Salvar Registro</button>
          </div>
        </div>

        {/* ÁREA DOS FORMULÁRIOS - OCUPA TODO O RESTANTE DA TELA */}
        <div className="flex-1 w-full p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto bg-[#f8fafc]">
          
          {/* COLUNA 1: DADOS PESSOAIS */}
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col gap-10">
            <h2 className="text-xl font-black text-blue-600 uppercase tracking-widest flex items-center gap-3">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Dados Pessoais
            </h2>
            
            <div className="space-y-8">
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Nome Completo</label>
                <input type="text" placeholder="Dr. Nome do Paciente" className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[24px] font-bold text-slate-700 focus:border-blue-500/20 focus:bg-white transition-all outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">CPF</label>
                  <input type="text" placeholder="000.000.000-00" className="w-full p-6 bg-slate-50 border-none rounded-[24px] font-bold text-slate-700 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Nascimento</label>
                  <input type="text" placeholder="dd/mm/aaaa" className="w-full p-6 bg-slate-50 border-none rounded-[24px] font-bold text-slate-700 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Gênero</label>
                <select className="w-full p-6 bg-slate-50 border-none rounded-[24px] font-bold text-slate-700 outline-none appearance-none">
                  <option>Masculino</option>
                  <option>Feminino</option>
                  <option>Outros</option>
                </select>
              </div>
            </div>
          </div>

          {/* COLUNA 2: CONTATO E SAÚDE */}
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col gap-10">
            <h2 className="text-xl font-black text-emerald-500 uppercase tracking-widest flex items-center gap-3">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" /> Contato & Saúde
            </h2>
            
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">E-mail</label>
                <input type="email" placeholder="paciente@provedor.com" className="w-full p-6 bg-slate-50 border-none rounded-[24px] font-bold text-slate-700 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Telefone / WhatsApp</label>
                <input type="text" placeholder="(11) 99999-9999" className="w-full p-6 bg-slate-50 border-none rounded-[24px] font-bold text-slate-700 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Convênio Médico</label>
                <input type="text" placeholder="Particular / Unimed / Bradesco" className="w-full p-6 bg-slate-50 border-none rounded-[24px] font-bold text-slate-700 outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Alergias Conhecidas</label>
                <textarea placeholder="Nenhuma" className="w-full p-6 bg-slate-50 border-none rounded-[24px] font-bold text-slate-700 h-28 resize-none outline-none focus:bg-red-50/50 transition-all" />
              </div>
            </div>
          </div>

          {/* COLUNA 3: LOCALIZAÇÃO E ANEXOS */}
          <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col gap-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px]" />
            
            <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3 relative z-10">
              <span className="w-1.5 h-6 bg-white rounded-full" /> Localização
            </h2>

            <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 block mb-2">CEP</label>
                  <input type="text" placeholder="00000-000" className="w-full p-6 bg-white/5 border border-white/10 rounded-[24px] font-bold text-white outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 block mb-2">Cidade</label>
                  <input type="text" placeholder="Ex: São Paulo" className="w-full p-6 bg-white/5 border border-white/10 rounded-[24px] font-bold text-white outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 block mb-2">Rua / Logradouro</label>
                <input type="text" placeholder="Av. Paulista, 1000" className="w-full p-6 bg-white/5 border border-white/10 rounded-[24px] font-bold text-white outline-none" />
              </div>

              <div className="pt-4">
                <button type="button" className="w-full p-10 rounded-[32px] bg-blue-600 flex items-center justify-center gap-6 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 group">
                  <span className="text-4xl font-light text-white/80 group-hover:scale-125 transition-transform">+</span>
                  <div className="text-left">
                    <p className="text-xl font-black italic tracking-tighter leading-none">ANEXAR EXAMES</p>
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">PDF, JPG ou DICOM</p>
                  </div>
                </button>
              </div>

              <div className="mt-6 p-6 rounded-3xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] text-center italic">Privacidade Total LGPD</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}