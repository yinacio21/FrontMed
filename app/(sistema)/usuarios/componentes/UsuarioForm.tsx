'use client'
import { Usuario } from "@/app/context/AuthContext"
import Link from "next/link";
import { useState } from "react"


export default function UsuarioForm() {

    const [usuario, setUsuario] = useState<Usuario>(new Usuario(0, '', '', true));

    const handleChange = (campo: 'nome' | 'cpf', valor: string) => {
        setUsuario(prev =>
            new Usuario(
                prev.codigo,
                campo === 'nome' ? valor : prev.nome,
                campo === 'cpf' ? valor : prev.cpf,
                prev.ativo
            )
        )
    }

    const handleSalvar = (FormData : FormData)=>{

    }



    return (<form action={handleSalvar}>
        <div>
            <div>
                <label>
                    Nome Completo
                </label>
                <input required value={usuario.nome} onChange={(e) => handleChange('nome', e.target.value)} placeholder="João da silva sauro"></input>
            </div>
            <div>
                <label>
                    CPF
                </label>
                <input type="text" maxLength={14} required onChange={(e)=> handleChange('cpf', e.target.value)} value={usuario.cpf} placeholder="000.000.000.00"/>
            </div>
        </div>
        <Link href="/usuario">Cancelar</Link>
        <button type="submit">Salvar</button>
    </form>)
}