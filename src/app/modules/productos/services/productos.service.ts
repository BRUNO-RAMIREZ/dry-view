import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

import {ProductHTTPResponse, ProductModel} from "../../../core/models/product.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class ProductosService {
  private _baseURL: string;

  constructor(private _http: HttpClient) {
    this._baseURL = environment.baseURL;
  }

  public getAllProducts(): Observable<ProductModel[]> {
    return this._http.get<ProductHTTPResponse>(`${this._baseURL}/products/getAll`)
      .pipe(map(res => res.products));
  }
}
