
import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  VentasCreateRequest,
  VentasCreateResponse,
  VentasGetAllResponse,
  VentasGetByIdResponse,
  VentasListResponse,
  VentasUpdateRequest,
  VentasUpdateResponse
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

  public updateVenta(ventasUpdateRequest: VentasUpdateRequest): Observable<VentasUpdateResponse> {
    return this._http.put<VentasUpdateResponse>(`${this._baseURL}/sales/${ventasUpdateRequest.id}`, ventasUpdateRequest)
      .pipe(
        tap((response) => console.warn("VENTA", response)),
        map((response: VentasUpdateResponse) => {
          const currentVentas = this._ventas.getValue();
          const updatedVentas = currentVentas.map((venta) => {
            if (venta.id === ventasUpdateRequest.id) {
              return {
                ...venta,
                ...ventasUpdateRequest // Optional: update the product locally as well
              };
            }
            return venta;
          });
          this._ventas.next(updatedVentas);
          return response;
        })
      );
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

