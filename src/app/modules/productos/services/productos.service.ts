import { Injectable } from '@angular/core';
import {ProductModel} from '../../../core/models/product.model';
import {HttpClient} from '@angular/common/http';
import {direccionAPI} from '../../../core/globalVars';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  public getAllProductos():Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(direccionAPI+'/apartadoProductos');
  }
}
