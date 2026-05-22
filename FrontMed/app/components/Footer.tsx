export default function Footer(){
    const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-blue-100 bg-blue-50/80 backdrop-blur-md py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Copyright e Identidade */}
          <div className="text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-bold text-slate-600">
                © {currentYear} <span className="text-blue-600">MediSys</span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <p className="text-xs font-medium text-slate-500 tracking-wide">
                Gestão Clínica Inteligente. Todos os direitos reservados.
              </p>
            </div>
          </div>

          {/* Links com SVGs W3C - Estilo Preenchido */}
          <nav className="flex items-center gap-4">
            <a 
              href="#" 
              className="group flex items-center gap-2 rounded-lg bg-white/50 border border-blue-100 px-4 py-2 text-sm font-bold text-emerald-700 transition-all hover:bg-white hover:shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Suporte</span>
            </a>

            <a 
              href="#" 
              className="group flex items-center gap-2 rounded-lg bg-white/50 border border-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-white hover:shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>Termos</span>
            </a>
          </nav>
        </div>

        {/* Status do Sistema e Separador */}
        <div className="mt-8 pt-6 border-t border-blue-100/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
              Servidor Ativo
            </span>
          </div>
          
          <div className="text-[10px] font-bold text-blue-400/60 uppercase tracking-tighter">
            Versão 1.0.4-stable
          </div>
        </div>
      </div>
    </footer>
  );
}