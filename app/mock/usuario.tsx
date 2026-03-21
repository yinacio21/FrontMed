import { Usuario } from "../context/AuthContext"


export class UsuarioMock {

    private static usuarioDB: Usuario[] = [

        new Usuario(1, "Yasmin Inácio", "0000", "ATIVO"),
        new Usuario(2, "Edvan", "0000", "ATIVO"),
        new Usuario(3, "Berenice", "0000", "ATIVO"),
        new Usuario(4, "octavio", "0000", "ATIVO"),
        new Usuario(5, "tiago", "0000", "ATIVO"),
    ];

    static async listarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB]
    }

    static async salvar(usuario: Usuario): Promise<void> {

        const indexExistente = this.usuarioDB.findIndex(u => u.id === usuario.id);

        if (indexExistente === -1) {

            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.id??0)) + 1;
            usuario.id = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`usuario de ID ${novoCodigo} salvo com sucesso!`);

        } else {

            this.usuarioDB[indexExistente].nome = usuario.nome;
            this.usuarioDB[indexExistente].email = usuario.email;

            console.log(`Usuario de ID ${usuario.id} atualizado com sucesso!`);


        }


    }

    static async buscarPorId(codigo: Number): Promise<Usuario | undefined> {

        return this.usuarioDB.find(u => u.id === codigo)
    }
}

