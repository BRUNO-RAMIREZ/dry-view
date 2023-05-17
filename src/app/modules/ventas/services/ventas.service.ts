import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {
  VentasCreateRequest,
  VentasCreateResponse,
  VentasGetAllResponse, VentasGetByIdResponse,
  VentasListResponse, VentasUpdateRequest, VentasUpdateResponse,
} from "../../../core/models/ventas.model";

@Injectable()
export class VentasService {
  private _baseURL: string;
  private _ventas: BehaviorSubject<VentasListResponse[]>;
  
  constructor(private _http: HttpClient) { 
     this._baseURL = environment.baseURL;
    this._ventas = new BehaviorSubject<VentasListResponse[]>([]);
    this.getAllVentas().subscribe(response => {
      this._ventas.next(response);
    })
  }
  public get ventasObservable(): Observable<VentasListResponse[]> {
    return this._ventas.asObservable();
  }

  public createProduct(venta: VentasCreateRequest): Observable<VentasCreateResponse> {
    return this._http.post<VentasCreateResponse>(`${this._baseURL}/ventas/create`, venta)
      .pipe(map((newVenta: VentasCreateResponse) => {
        const currentVentas = this._ventas.getValue();
        this._ventas.next([...currentVentas, newVenta]);
        return newVenta;
      }));
  }

   // Evitar usar este metodo directamente utilizar el productsObservable
   public getAllVentas(): Observable<VentasListResponse[]> {
    return this._http.get<VentasGetAllResponse>(`${this._baseURL}/ventas/getAll`)
      .pipe(map(res => res.ventas));
  }

  public getVentasById(ventaId: number): Observable<VentasGetByIdResponse> {
    return this._http.get<VentasGetByIdResponse>(`${this._baseURL}/ventas/${ventaId}/findById`);
  }

  public deleteVentasById(ventaId: number): Observable<void> {
    return this._http.delete<void>(`${this._baseURL}/products/${ventaId}`)
      .pipe(
        map(() => {
          const currentVentas = this._ventas.getValue();
          const updatedVentas = currentVentas.filter((venta: VentasUpdateRequest) => venta.id !== ventaId);
          this._ventas.next(updatedVentas);
        })
      );
  }
  
}
