import { Usuario } from "../context/AuthContext"


export class UsuarioMock{
    
    private static usuarioDB: Usuario[] = [

        new Usuario(1,"Yasmin Inácio", "0000", true),
        new Usuario(2,"Edvan", "0000", true),
        new Usuario(3,"Berenice", "0000", true),
        new Usuario(4,"octavio", "0000", true),
        new Usuario(5,"tiago", "0000", true),
    ];

    static async listarTodos(): Promise<Usuario[]>{
        return [...this.usuarioDB]
    }
}

