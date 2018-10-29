import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_CONFIG } from "../../../config/api.config";
import { AlunoDTO } from "../../models/aluno.dto";

@Injectable()
export class AlunoService {

    constructor(public http: HttpClient) {

    }

    findAll(): Observable<AlunoDTO[]> {
        return this.http.get<AlunoDTO[]>(`${API_CONFIG.baseUrl}/alunos`);
    }

    insert(obj: AlunoDTO) {
        
        return this.http.post(
            `${API_CONFIG.baseUrl}/alunos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    delete(id: any) {
        return this.http.delete(`${API_CONFIG.baseUrl}/alunos/${id}`);
    }

    
    update(obj: any ,id: any){

        return this.http.put(
            `${API_CONFIG.baseUrl}/alunos/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}