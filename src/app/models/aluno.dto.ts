import { RefDTO } from "./ref.dto";

export interface Contato {
    id: string;
    referencia: string;
    celular: string;
    comercial: string;
    residencial: string;
}

export interface Endereco {
    id: string;
    endereco: string;
    numero: number;
    bairro: string;
    complemento: string;
}

export interface AlunoDTO {
    id: string;
    nome: string;
    pai: string;
    mae: string;
    periodo: string;
    celular: string;
    status: string;
    recado: string;
    valor: number;
    vencimento: number;
    enderecos: Endereco[];
    contatos: Contato[];
    colegio: RefDTO;
    veiculo: RefDTO;

}