export class Medico {
    constructor(
        public id: number | null,
        public nome: string,
        public crm: string,
        public especialidade: string,
        public email: string,
        public status: string,
        public senha: string
    ) { }
}

export interface MedicoFormProps {
    medicoExistente?: Medico
}
