export default function Header(){
    return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-blue-50/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo / Nome do Sistema */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-200">
            {/* SVG Ícone de Estetoscópio - Branco para destacar no fundo verde */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
              <circle cx="20" cy="10" r="2" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
            Med<span className="text-blue-600">Flow</span>
          </h1>
        </div>

        {/* Área do Usuário */}
        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-sm font-bold text-slate-800">Dra. Yasmin Inácio</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
              CRM 12345
            </span>
          </div>

          <div className="h-10 w-px bg-blue-200 hidden md:block mx-2" />

          <button 
            className="group flex items-center gap-2 rounded-xl bg-white border border-blue-200 px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm"
            title="Sair do sistema"
          >
            <span className="hidden sm:inline">Sair</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
        
      </div>
    </header>
  );
}