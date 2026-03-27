'use client'
import { Usuario } from "@/app/context/AuthContext"
import { UsuarioMock } from "@/app/mock/usuario";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface UsuarioFormProps {
  usuarioExistente?: Usuario
}

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {
  const [usuario, setUsuario] = useState<Usuario>(usuarioExistente || new Usuario(null, '', '', "ATIVO"));

  const router = useRouter()

  const handleChange = (campo: 'nome' | 'email', valor: string) => {
    setUsuario(prev =>
      new Usuario(
        prev.id,
        campo === 'nome' ? valor : prev.nome,
        campo === 'email' ? valor : prev.email,
        prev.status
      )
    );
  }

  const handleSalvar = async () => {

    if(usuarioExistente){

      var dadosResult = await axios.put<number>('http://localhost:8080/usuarios/'+usuarioExistente.id,usuario);
      if(dadosResult.status !== 200){
        return;
      }
    
    alert("Usuário salvo com sucesso! Código" + dadosResult.data)
      
    }else{

      var dadosResult = await axios.post<number>('http://localhost:8080/usuarios',usuario);
      if(dadosResult.status !== 200){
        return;
      }
    
    alert("Usuário salvo com sucesso! Código" + dadosResult.data)
  }

   router.push("/usuarios")
    }
    

  return (
    <form action={handleSalvar} className="space-y-8">
      {/* GRID DE INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CAMPO: NOME */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
            Nome Completo
          </label>
          <div className="relative group">
            <input 
              required 
              value={usuario.nome} 
              onChange={(e) => handleChange('nome', e.target.value)} 
              placeholder="Ex: João da Silva Sauro"
              className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-5 py-4 font-bold text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-300"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>
        </div>

        {/* CAMPO: email */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
            email do Usuário
          </label>
          <div className="relative group">
            <input 
              type="email"
              required 
              onChange={(e) => handleChange('email', e.target.value)} 
              value={usuario.email} 
              placeholder="yasmin@gmail.com"
              className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-5 py-4 font-bold text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-300"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE AÇÕES (BOTÕES) */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-10 pt-8 border-t border-slate-100">
        
        <Link 
          href="/usuarios" 
          className="w-full sm:w-auto px-8 py-4 text-sm font-black text-slate-400 hover:text-red-500 transition-all uppercase tracking-widest text-center"
        >
          Cancelar
        </Link>

        <button 
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-10 py-4 text-sm font-black text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.5)] active:scale-95 ring-2 ring-blue-400/20 uppercase tracking-[0.15em]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Confirmar e Salvar
        </button>
        
      </div>
    </form>
  )
}