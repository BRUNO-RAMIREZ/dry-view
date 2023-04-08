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

  public getAllProducts():Observable<{products:ProductModel[]}>{
    return this.http.get<{products:ProductModel[]}>(direccionAPI+'/products/getAll');
  }
  public createProduct(product:ProductModel){
    return this.http.post<ProductModel>(direccionAPI+'/products/create',product);
  }

  public updateProduct(product:ProductModel){
   /* let aux = {"name":product.name,
              "description":product.description,
              "image":product.image,
              "purchasePrice":product.purchase_price,
              "salePrice":product.sale_price,
              "stock":product.stock};
    console.log(aux);*/
    return this.http.put(direccionAPI+'/products/'+product.id,product);
  }
  public deleteProduct(productid:number){
    return this.http.delete(direccionAPI+'/products/'+productid);
  }
  public getProductById(id:string){
    return this.http.get<ProductModel>(direccionAPI+'/products/'+id+'/findById');

  }
}
