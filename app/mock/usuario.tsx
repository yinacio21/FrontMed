import { Usuario } from "../context/AuthContext"


export class UsuarioMock {

    private static usuarioDB: Usuario[] = [

        new Usuario(1, "Yasmin Inácio", "0000", true),
        new Usuario(2, "Edvan", "0000", true),
        new Usuario(3, "Berenice", "0000", true),
        new Usuario(4, "octavio", "0000", true),
        new Usuario(5, "tiago", "0000", true),
    ];

    static async listarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB]
    }

    static async salvar(usuario: Usuario): Promise<void> {

        const indexExistente = this.usuarioDB.findIndex(u => u.codigo === usuario.codigo);

        if (indexExistente === -1) {

            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.codigo)) + 1;
            usuario.codigo = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`usuario de ID ${novoCodigo} salvo com sucesso!`);

        } else {

            this.usuarioDB[indexExistente].nome = usuario.nome;
            this.usuarioDB[indexExistente].cpf = usuario.cpf;

            console.log(`Usuario de ID ${usuario.codigo} atualizado com sucesso!`);


        }


    }

    static async buscarPorId(codigo: Number): Promise<Usuario | undefined> {

        return this.usuarioDB.find(u => u.codigo === codigo)
    }
}

