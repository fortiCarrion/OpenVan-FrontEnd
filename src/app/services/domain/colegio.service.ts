import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_CONFIG } from "../../../config/api.config";
import { ColegioDTO } from "../../models/colegio.dto";

@Injectable()
export class ColegioService {

    constructor(public http: HttpClient) {

    }

    findAll(): Observable<ColegioDTO[]> {
        return this.http.get<ColegioDTO[]>(`${API_CONFIG.baseUrl}/colegios`);
    }

    insert(obj: ColegioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/colegios`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    delete(id: any) {
        return this.http.delete(`${API_CONFIG.baseUrl}/colegios/${id}`);
    }
}