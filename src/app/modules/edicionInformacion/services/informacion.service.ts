import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {InformacionUpdateRequest,InformacionGetResponce,InformacionUpdateResponse} from '../../../core/models/informacion.model';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private _baseURL: string;
  constructor(private _http: HttpClient) { 
    this._baseURL = environment.baseURL;
  }

  public getInfo(): Observable<InformacionGetResponce> {
    return this._http.get<InformacionGetResponce>(`${this._baseURL}/information/getInfo`);
  }
  public editInfo(info:InformacionUpdateRequest): Observable<InformacionUpdateResponse>{
    return this._http.put<InformacionUpdateResponse>(`${this._baseURL}/information/updateInfo`,info);
  }
}
