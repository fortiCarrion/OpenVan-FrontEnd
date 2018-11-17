import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_CONFIG } from "../../../config/api.config";
import { VeiculoDTO } from "../../models/veiculo.dto";

@Injectable()
export class VeiculoService {

    constructor(public http: HttpClient) {

    }

    public findAll(): Observable<VeiculoDTO[]> {
        return this.http.get<VeiculoDTO[]>(`${API_CONFIG.baseUrl}/veiculos`);
    }

    insert(obj: VeiculoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/veiculos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    delete(id: any) {
        return this.http.delete(`${API_CONFIG.baseUrl}/veiculos/${id}`);
    }

    findOne(id: any): Observable<VeiculoDTO> {
        return this.http.get<VeiculoDTO>(`${API_CONFIG.baseUrl}/veiculos/${id}`);
    }

    update(obj: VeiculoDTO, id: any){
        return this.http.put(
            `${API_CONFIG.baseUrl}/veiculos/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            });
    }
}