import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable, of} from "rxjs";
import {VentasGetAllResponse,VentasListResponse} from '../../../core/models/ventas.model';
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private _baseURL: string;
  constructor(private _http: HttpClient) {
    this._baseURL = environment.baseURL;
   }

   public getVentasPorFecha(desde:Date, hasta:Date): Observable<VentasListResponse[]> {
    return this._http.get<VentasGetAllResponse>(`${this._baseURL}/products/getAll`)
      .pipe(map(res => res.ventas));
  }
}
