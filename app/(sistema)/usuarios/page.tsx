'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import axios from "axios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const dados = await axios.get<Usuario[]>('http://localhost:8080/usuarios')

      if(dados.status !==200){
        alert("Erro ao carregar dados!")
      }
      setUsuarios(dados.data);
    } catch (error) {
      console.error(error)
    }
  }

  const handleAlterarStatus = async (usuario: Usuario) => {
    try {
      setUsuarios(usuariosAtuais =>
        usuariosAtuais.map(u => u.id === usuario.id ? new Usuario(u.id, u.nome, u.email, u.status) : u)
      );
    } catch (error) {
      alert("Erro ao alterar status do usuário!")
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gestão de Usuários</h1>
            <p className="text-slate-500 font-medium">Controle de acessos e moderadores do sistema</p>
          </div>
          <Link 
            href="/usuarios/novo" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
            Novo Usuário
          </Link>
        </div>

        {/* TABELA CARD */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Código</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-mono text-sm text-slate-400">#{usuario.id}</td>
                    <td className="px-8 py-6">
                      <span className="font-bold text-slate-700 block">{usuario.nome}</span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium">{usuario.email}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        usuario.status ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${usuario.status ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {usuario.status ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        {/* BOTÃO EDITAR */}
                        <Link 
                          href={`/usuarios/${usuario.id}/editar`}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                          Editar
                        </Link>

                        {/* BOTÃO STATUS (DINÂMICO) */}
                        <button 
                          onClick={() => handleAlterarStatus(usuario)}
                          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${
                            usuario.status
                              ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-red-100' 
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-emerald-100'
                          }`}
                        >
                          {usuario.status ? 'Inativar' : 'Ativar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* EMPTY STATE */}
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <p className="text-slate-400 font-bold">Nenhum usuário encontrado!</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FOOTER */}
        <div className="mt-6 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">MediSys Security Protocol v4.0</p>
        </div>
      </div>
    </div>
  )
}