import { AlunoDTO } from './aluno.dto';

export interface MensalidadeDTO {
    id: number;
    emissao: Date;
    pagamento: Date;
    vencimento: Date;
    status: string;
    valor: number;
    aluno: AlunoDTO;
}