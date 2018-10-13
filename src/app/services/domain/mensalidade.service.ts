import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { API_CONFIG } from "../../../config/api.config";
import { MensalidadeDTO } from "../../models/mensalidade.dto";

@Injectable()
export class MensalidadeService {

    constructor(public http: HttpClient) {

    }

    findAll(): Observable<MensalidadeDTO[]> {
        return this.http.get<MensalidadeDTO[]>(`${API_CONFIG.baseUrl}/mensalidades`);
    }

    insert(obj: MensalidadeDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/mensalidades`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}