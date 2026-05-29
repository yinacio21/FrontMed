export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="h-14 bg-white/80 border-t border-slate-200/80 flex items-center justify-between px-6 flex-shrink-0 backdrop-blur">
      <p className="text-xs font-medium text-slate-400">
        © {currentYear} <span className="font-bold text-slate-600">MediSys</span> — Gestao Clinica Inteligente
      </p>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-slate-400 font-bold">Servidor ativo</span>
      </div>
    </footer>
  );
}
