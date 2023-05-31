
import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  VentasCreateRequest,
  VentasCreateResponse,
  VentasGetAllResponse,
  VentasGetByIdResponse,
  VentasListResponse,
  VentasCancelRequest,
  VentasCancelResponse
} from "../../../core/models/ventas.model";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class VentasService {
  private _baseURL: string;
  private _ventas: BehaviorSubject<VentasListResponse[]>;

  constructor(private _http: HttpClient) {
    this._baseURL = environment.baseURL;
    this._ventas = new BehaviorSubject<VentasListResponse[]>([]);
    this.getAllVenta().subscribe(response => this._ventas.next(response));
  }

  public createVenta(venta: VentasCreateRequest): Observable<VentasCreateResponse> {
    return this._http.post<VentasCreateResponse>(`${this._baseURL}/sales/create`, venta);
  }

  public get ventasObservable(): Observable<VentasListResponse[]> {
    return this._ventas.asObservable();
  }

  // Evitar usar este metodo directamente utilizar el usersObservable
  public getAllVenta(): Observable<VentasListResponse[]> {
    return this._http.get<VentasGetAllResponse>(`${this._baseURL}/sales/getAllSales`)
      .pipe(map(res => res.sales));
  }

  public cancelVenta(ventasCancelRequest: VentasCancelRequest): Observable<void> {
    return this._http.put<void>(`${this._baseURL}/sales/${ventasCancelRequest.id}`, []);
  }

  public getVentaById(ventaId: number): Observable<VentasGetByIdResponse> {
    return this._http.get<VentasGetByIdResponse>(`${this._baseURL}/sales/${ventaId}/findById`);
  }

  /*public deleteVentaById(ventaId: number): Observable<void> {
    return this._http.delete<void>(`${this._baseURL}/users/${ventaId}`)
      .pipe(
        map(() => {
          const currentUsers = this._ventas.getValue();
          const updatedProducts = currentUsers.filter((venta: VentasUpdateResponse) => venta.id != ventaId);
          this._ventas.next(updatedProducts);
        })
      );
  }*/

  }

